import React, { useEffect, useState } from "react"
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import {getAllTasks} from '../../services/TaskService.js'

const InformationTaskCard = () => {

    const [taskList, setTaskList] = useState([]) 

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    async function findAllTask(){

        const response = await getAllTasks();

        setTaskList(response.jsonObjectList);
    }

    useEffect(() => {
        findAllTask();
    }, []);

    return <>
        <Paper sx={{
            height: '100%',
            width: '100%',
            border: 'solid black 1px',
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
                    <TableBody>
                        {taskList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task => {
                            return <>
                                <TableRow hover role="checkbox" tabIndex={-1} >   
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
                                        {task.taskStatus ? 'Done' : 'Pendding'}
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
    </>
    
}

export { InformationTaskCard }