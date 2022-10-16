import React, { useState } from 'react';
import { InformationTaskCard } from '../../cards/InformationTaskCard';

import { Box } from "@mui/system";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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

import './MainPanel.css'
import { save } from '../../../services/TaskService';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const  MainPanel = () => {

    const [open, setOpen] = useState(false);
    

    const task = {
        name: '',
        description: '',
        status: false
    }
    
    async function saveTask(task){
      let response =  await save(task);
      return response
    }

    function SimpleDialog(props) {
        const {onClose, selectedValue, open } = props;
        const [openSnackBar, setOpenSnackBar] = useState(false);
        const [ message, setMessage] = useState('')
        const [ messageType,  setMessageType] = useState('')
        
        const handleClose = () => {
          onClose(selectedValue);
        };

        const handleOnSubmit = () => {

            if(task.name == '') {
                setOpenSnackBar(true)
                setMessage("Please, fill the name field!")
                return
            }

            if(task.description == ''){
                setOpenSnackBar(true)
                setMessage("Please, fill the description field!")
                return
            }

            const response = saveTask(task)
             
        }

        return <>
            <Snackbar open={openSnackBar} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert  severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Dialog onClose={handleClose} open={open} >
                <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '500px', width: '500px'}}>
                    <CardContent sx={{display: 'flex', height: '40px', border: 'solid black 1px', borderTopRightRadius: '4px', borderTopLeftRadius: '4px', background: 'rgb(48, 106, 212);'}}>
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
                                <FormControlLabel labelPlacement='start' control={<Checkbox />} label="Task Status" sx={{margin: '0px'}} onChange={(event) => task.status = event.target.value}/>
                            </FormGroup>
                        </FormControl>
                    </CardActions>
                    <CardActions sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center', width: '100%', height: '100px'}}>
                        <Stack direction="row" spacing={2} >
                            <Button variant="contained" color="success" sx={{height: '50px', width: '150px'}} onClick={handleOnSubmit}>
                                Submit
                            </Button>
                            <Button variant="contained" color="error" sx={{height: '50px', width: '150px'}}>
                                Cancel
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
                
            </Dialog>
            
            
        </>
    }
      
    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
    };

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = (value) => {
        setOpen(false);
    };

    return <>
        <div className='container'>
            <header className='panel-header'>
            </header>
            <content className='panel-content'>
                <InformationTaskCard></InformationTaskCard>
            </content>
            <footer className='panel-footer'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'right', width: '100%', height: '100%'}}>
                    <Fab color="primary" aria-label="add" sx={{height: '70px', width: '70px', marginRight: '20px'}} onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>
                    <SimpleDialog
                        open={open}
                        onClose={handleClose}
                    />
                </Box>
            </footer>
        </div>
    </>
}

export { MainPanel };