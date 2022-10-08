import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog"; 
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SearchDialog = ({isOpen, isClose}) => {
    
    return <>
        <div>
            <Button>

            </Button>
            <Dialog
                fullScreen={true}
                open={isOpen}
                onClose={isClose}>
                    <DialogTitle>
                        TESTE
                    </DialogTitle>
            </Dialog>
        </div>
    </>

}

export { SearchDialog }