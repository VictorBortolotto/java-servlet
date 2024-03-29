import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box } from '@mui/system';

import { updateTaskDescription, updateTaskName, updateStatus, deleteTask, updateTask } from '../../services/TaskService';

const EditTaskDialog = ({openDialog, onCloseDialog, task}) =>  {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [ message, setMessage] = useState('')
    const [ messageType,  setMessageType] = useState('')
    
    const newTask = {
        id: 0,
        name: '',
        description: '',
        status: task.taskStatus
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        setOpenSnackBar(false);
        window.location.reload(false);
    };

    const onChange = (target) => {
        if (target.checked == true && task.taskStatus == true) {
            newTask.status = false
        } 
        
        if (target.checked == true && task.taskStatus == false) {
            newTask.status = true
        }
    }

    async function update(nameValue, descriptionValue){

        if(nameValue !== task.taskName && descriptionValue !== task.taskDescription && newTask.status !== task.taskStatus){
            const responseTask = await updateTask(task.taskId, newTask)
            setStatusBar(responseTask.jsonObject.status_code, responseTask.jsonObject.message)
            return
        }

        if(nameValue !== task.taskName && descriptionValue !== task.taskDescription){
            const responseTaskName = await updateTaskName(task.taskId, newTask)
            const responseTaskDescription = await updateTaskDescription(task.taskId, newTask)
            let statusCode = 0;
            let message = ''

            if(responseTaskName.jsonObject.status_code == 200 && responseTaskDescription.jsonObject.status_code == 200){
                statusCode = 200;
                message = 'Task updated with success!'
            }

            if(responseTaskName.jsonObject.status_code == 500 && responseTaskDescription.jsonObject.status_code == 500){
                statusCode = 500;
                message = 'Server error!'
            }

            setStatusBar(statusCode, message)
            return;
        }

        if(nameValue !== task.taskName && newTask.status !== task.taskStatus){
            const responseTaskName = await updateTaskName(task.taskId, newTask)
            const responseTaskStatus = await updateStatus(task.taskId, newTask)
            let statusCode = 0;
            let message = ''

            if(responseTaskName.jsonObject.status_code == 200 && responseTaskStatus.jsonObject.status_code == 200){
                statusCode = 200;
                message = 'Task updated with success!'
            }

            if(responseTaskName.jsonObject.status_code == 500 && responseTaskStatus.jsonObject.status_code == 500){
                statusCode = 500;
                message = 'Server error!'
            }

            setStatusBar(statusCode, message)
            return;
        }

        if(descriptionValue !== task.taskDescription && newTask.status !== task.taskStatus){
            const responseTaskDescription = await updateTaskDescription(task.taskId, newTask)
            const responseTaskStatus = await updateStatus(task.taskId, newTask)
            let statusCode = 0;
            let message = ''
    
            if(responseTaskDescription.jsonObject.status_code == 200 && responseTaskStatus.jsonObject.status_code == 200){
                statusCode = 200;
                message = 'Task updated with success!'
            }
    
            if(responseTaskDescription.jsonObject.status_code == 500 && responseTaskStatus.jsonObject.status_code == 500){
                statusCode = 500;
                message = 'Server error!'
            }
    
            setStatusBar(statusCode, message)
            return;
        }

        if(nameValue !== task.taskName){
            const responseTaskName = await updateTaskName(task.taskId, newTask)
            setStatusBar(responseTaskName.jsonObject.status_code, responseTaskName.jsonObject.message)
            return;
        }

        if(descriptionValue !== task.taskDescription){
            const responseTaskDescription = await updateTaskDescription(task.taskId, newTask)
            setStatusBar(responseTaskDescription.jsonObject.status_code, responseTaskDescription.jsonObject.message)
            return;
        }

        if(newTask.status !== task.taskStatus){
            const responseTaskStatus = await updateStatus(task.taskId, newTask)
            setStatusBar(responseTaskStatus.jsonObject.status_code, responseTaskStatus.jsonObject.message)
            return;
        }

    }

    async function deleteTaskById(){
        const responseTaskDelete = await deleteTask(task.taskId)
        setStatusBar(responseTaskDelete.jsonObject.status_code, responseTaskDelete.jsonObject.message)
    }

    function setStatusBar(statusCode, message){
        setOpenSnackBar(true)
        if(statusCode == 200){
            setMessage(message)
            setMessageType('success');
        }

        if(statusCode == 404){
            setMessage(message)
            setMessageType('warning');
        }

        if(statusCode == 500){
            setMessage(message)
            setMessageType('error');
        }
    }

    const handleClickDelete = () => {
        deleteTaskById();
    }

    const handleSubmitChanges = () => {
        let fieldNameValue = document.getElementById('textName').value
        let fieldDescriptionValue = document.getElementById('textDescription').value

        if(fieldNameValue === task.taskName && fieldDescriptionValue === task.taskDescription && newTask.status === task.taskStatus){
            return
        }

        update(fieldNameValue, fieldDescriptionValue)

    }

    return <>
        <Dialog onClose={onCloseDialog} open={openDialog} >
            <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '500px', width: '500px'}}>
                <CardContent sx={{display: 'flex', height: '40px', borderBottom: 'solid black 1px', background: 'rgb(48, 106, 212);'}}>
                    <Typography variant='h5' sx={{width: '100%', textAlign: 'center', color: 'white'}}>EDIT TASK</Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'center', width: '100%', height: '100%', padding: '0px'}}>
                    <FormControl sx={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', marginTop: '25px'}}>
                        <TextField
                            id='textName'
                            required
                            label="Task Name"
                            defaultValue={task.taskName}
                            onChange={(event) => newTask.name = event.target.value}
                            sx={{display: 'flex', width: '90%'}}
                        />
                        <TextField
                            id='textDescription'
                            required
                            label="Task Description"
                            multiline
                            defaultValue={task.taskDescription}
                            rows={4}
                            sx={{display: 'flex', width: '90%', marginTop: '10px'}}
                            onChange={(event) => newTask.description = event.target.value}
                        />
                        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '10px', width: '90%'}}>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                label="Task Status"
                                defaultValue={`${task.taskStatus ? "Done" : "Pending"}`}
                                sx={{width: '100%'}}
                            />
                            <FormGroup sx={{display: 'flex', justifyContent: 'start', width: '90%'}}>
                                <FormControlLabel labelPlacement='start' control={<Checkbox id='checkboxStatus' onChange={({target}) => onChange(target)} />} label={task.taskStatus ? "To pending" : "To done"} sx={{margin: '0px'}} />
                            </FormGroup>
                        </Box>
                    </FormControl>
                </CardActions>
                <CardActions sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center', height: '100px', borderTop: 'solid black 1px'}}>
                    <Stack direction="row" spacing={2} >
                        <Button variant="contained" color="success" sx={{height: '50px', width: '150px'}} onClick={handleSubmitChanges}>
                            Submit
                        </Button>
                        <Button variant="contained" color="error" sx={{height: '50px', width: '150px'}} onClick={handleClickDelete}>
                            Delete
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Dialog>
        <Snackbar open={openSnackBar} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={350} onClose={handleCloseSnackBar}>
            <Alert severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </>
}

export { EditTaskDialog }