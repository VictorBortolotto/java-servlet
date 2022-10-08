import React, { useState } from 'react'

import { Box } from '@mui/material'
import SpeedDial  from '@mui/material/SpeedDial';
import SpeedDialAction  from '@mui/material/SpeedDialAction';
import SpeedDialIcon  from '@mui/material/SpeedDialIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Dialog, DialogTitle } from "@mui/material";
import { SearchDialog } from '../popups/SearchDialog';

const FabButton = () => {

    const [open, setOpen ] = useState(false)
    const [close, setClose] = useState(true)

    const openSearchPopUp = () => {
        return openSarchDialog()   
    }

    function openSarchDialog() {
        if(open == true){
            setOpen(false)
            setClose(true)
            console.log("Passou aqui 1", open, close)
        }else{
            setOpen(true)
            setClose(false)
            console.log("Passou aqui 2", open, close)
        }

        return <>
            <SearchDialog isOpen={open} isClose={close} ></SearchDialog>
        </>
    }

    const actions = [
        {icon: <SearchIcon/>, name: 'Search', color: 'secondary', onClick:{openSearchPopUp}},
        {icon: <AddCircleIcon/>, name: 'New Task', color: 'secondary'},
        {icon: <RemoveCircleIcon/>, name: 'Remove', color: 'secondary'}
    ]    

    return <>
        <Box >
            <SpeedDial
                ariaLabel=""
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        color={action.color}
                        tooltipTitle={action.name}
                        onClick={() => openSarchDialog()}
                    />
                ))}
            </SpeedDial>
        </Box>
    </>
}

export { FabButton }