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
import { save } from '../../services/TaskService';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const NewTaskDialog = ({openDialog, onCloseDialog}) =>  {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [ message, setMessage] = useState('')
    const [ messageType,  setMessageType] = useState('')
    
    const [response, setResponse] = useState({})
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const task = {
        name: '',
        description: '',
        status: false
    }

    async function saveTask(task){
        const response =  await save(task);

        setResponse(response.jsonObject)

        if(response.jsonObject.status_code == 500){
            setOpenSnackBar(true)
            setMessage(response.jsonObject.message)
            setMessageType("error")
            return
        }

        if(response.jsonObject.status_code == 200){
            setOpenSnackBar(true)
            setMessage(response.jsonObject.message)
            setMessageType("success")
            onCloseDialog()
        }
    }  

    const handleCloseSnackBar = (event, reason) => {
        setOpenSnackBar(false);
    };

    const onChange = (target) => {
        if (target.checked) {
            task.status = true
        } else {
            task.status = false
        }
    }

    const handleOnSubmit = () => {

        if(task.name == '') {
            setOpenSnackBar(true)
            setMessage("Please, fill the field name!")
            setMessageType("warning")
            return
        }

        if(task.description == ''){
            setOpenSnackBar(true)
            setMessage("Please, fill the field description!")
            setMessageType("warning")
            return
        }

        saveTask(task)
    }

    return <>
        <Dialog onClose={onCloseDialog} open={openDialog} >
            <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '500px', width: '500px'}}>
                <CardContent sx={{display: 'flex', height: '40px', borderBottom: 'solid black 1px', background: 'rgb(48, 106, 212);'}}>
                    <Typography variant='h5' sx={{width: '100%', textAlign: 'center', color: 'white'}}>NEW TASK</Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'center', width: '100%', height: '100%', padding: '0px'}}>
                    <FormControl sx={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', marginTop: '25px'}}>
                        <TextField
                            required
                            label="Task Name"
                            onChange={(event) => task.name = event.target.value}
                            sx={{display: 'flex', width: '90%'}}
                        />
                        <TextField
                            required
                            label="Task Description"
                            multiline
                            rows={4}
                            sx={{display: 'flex', width: '90%', marginTop: '10px'}}
                            onChange={(event) => task.description = event.target.value}
                        />
                        <FormGroup sx={{display: 'flex', justifyContent: 'start', width: '90%'}}>
                            <FormControlLabel labelPlacement='start' control={<Checkbox onChange={({target}) => onChange(target)} />} label="Task Status" sx={{margin: '0px'}} />
                        </FormGroup>
                    </FormControl>
                </CardActions>
                <CardActions sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center', height: '100px', borderTop: 'solid black 1px'}}>
                    <Stack direction="row" spacing={2} >
                        <Button variant="contained" color="success" sx={{height: '50px', width: '150px'}} onClick={handleOnSubmit}>
                            Submit
                        </Button>
                        <Button variant="contained" color="error" sx={{height: '50px', width: '150px'}} onClick={onCloseDialog}>
                            Cancel
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Dialog>
        <Snackbar open={openSnackBar} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </>
}

export { NewTaskDialog }