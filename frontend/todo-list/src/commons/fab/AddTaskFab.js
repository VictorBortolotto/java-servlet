import React, { useState } from 'react';

import { Box } from "@mui/system";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { NewTaskDialog } from '../dialog/NewTaskDialog';

const AddtaskFab = () => {
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'right', width: '100%', height: '100%'}}>
            <Fab color="primary" aria-label="add" sx={{height: '70px', width: '70px', marginRight: '20px'}} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <NewTaskDialog openDialog={open} onCloseDialog={handleClose}/>
        </Box>
    </>

}

export { AddtaskFab }