import React, { useState } from 'react';

import { Box } from "@mui/system";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { EditableTasksCard } from "../../cards/EditableTasksCard";
import { NewTaskDialog } from "../../dialog/NewTaskDialog";

const TaskEditablePanel = ({status}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <div className='container'>
            <header className='panel-header'>
            </header>
            <content className='panel-content'>
                <EditableTasksCard taskStatus={status}></EditableTasksCard>
            </content>
            <footer className='panel-footer'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'right', width: '100%', height: '100%'}}>
                    <Fab color="primary" aria-label="add" sx={{height: '70px', width: '70px', marginRight: '20px'}} onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </Box>
                <NewTaskDialog openDialog={open} onCloseDialog={handleClose}/>
            </footer>
        </div>
    </>

}

export {TaskEditablePanel}