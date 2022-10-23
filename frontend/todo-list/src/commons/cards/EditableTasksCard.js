import React, { useEffect, useState } from "react"
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {getByStatus} from '../../services/TaskService.js'
import { EditTaskDialog } from "../dialog/EditTaskDialog.js";

const EditableTasksCard = ({taskStatus}) => {

    const [taskList, setTaskList] = useState([]) 

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ openEditDialog, setOpenEditDialog ] = useState(false)
    const [ openSnackBar, setOpenSnackBar ] = useState(false);
    const [ message, setMessage] = useState('')
    const [ messageType,  setMessageType] = useState('')
    const [ task, setTask ] = useState({})

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    function handleClickChangeTask(task) {
        setOpenEditDialog(true)
        setTask(task)
    }

    const handleOnCloseDialog = () => {
        setOpenEditDialog(false)
    }

    async function findTasksByStatus(taskStatus){

        const response = await getByStatus(taskStatus);
        if(response.jsonObject.status_code == 500){
            setOpenSnackBar(true)
            setMessage(response.jsonObject.message)
            setMessageType("error")
            return
        }

        if(response.jsonObject.status_code == 404){
            setTaskList([])
            setOpenSnackBar(true)
            setMessage(response.jsonObject.message)
            setMessageType("info")
            return
        }else{
            setTaskList(response.jsonObjectList);
        }
    }

    useEffect(() => {
        findTasksByStatus(taskStatus);
    }, []);


    return <>
        <Snackbar open={openSnackBar} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity={messageType}>
                {message}
            </Alert>
        </Snackbar>
        <Paper sx={{
            height: '100%',
            width: '100%',
            boxShadow: '0 0 1.0px black',
            borderRadius: '10px'
        }}>
            <TableContainer sx={{height: '100%',maxHeight: '100%', borderRadius: '10px'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center', fontSize: '18px' }}>ID</TableCell>
                            <TableCell sx={{textAlign: 'center', fontSize: '18px' }}>NAME</TableCell>
                            <TableCell sx={{textAlign: 'center', fontSize: '18px' }}>DESCRIPTION</TableCell>
                            <TableCell sx={{textAlign: 'center', fontSize: '18px' }}>STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {taskList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task => {
                            return <>
                                <TableRow key={task.id} hover role="checkbox" tabIndex={-1} onClick={() => handleClickChangeTask(task)}>   
                                    <TableCell sx={{textAlign: 'center'}} component="th" scope="row" >
                                        {task.taskId}
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}} component="th" scope="row">
                                        {task.taskName}
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}} component="th" scope="row">
                                        {task.taskDescription}
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center', color: `${task.taskStatus ? 'blue' : 'red'}` }} component="th" scope="row">
                                        {task.taskStatus ? 'Done' : 'Pending'}
                                    </TableCell>
                                </TableRow>
                            </>
                        })}  
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{display: 'flex', justifyContent: 'center'}}
                rowsPerPageOptions={[8, 25, 100]}
                component="div"
                count={taskList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <EditTaskDialog openDialog={openEditDialog} onCloseDialog={handleOnCloseDialog} task={task}></EditTaskDialog>
    </>
    
}

export { EditableTasksCard }