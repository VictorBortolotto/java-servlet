import React from 'react';

import { Card, FormControl, CardContent, CardActions, Box, TextField, Typography} from '@mui/material';

import Button from '@mui/material/Button';
import TaskService from '../../services/TaskService';

const task = {
    id: 0,
    taskName : '',
    description: '',

    getID(){
        return this.id;
    },

    setId(id){
        this.id = id;
    }, 

    getName(){
        return this.taskName;
    },

    setName(taskName){
        this.taskName = taskName;
    },

    getDescription(){
        return this.description;
    },

    setDescription(description){
        this.description = description;
    }

}


const  SearchCard = () => {

    function onClick(){
        let id = task.getID();
        let name = task.getName();
        let description = task.getDescription();
        if(id > 0 && name == '' && description == ''){
           let data = TaskService.getByID(id);
           task.setDescription(data.taskDescription)
           task.setName(data.taskName)
        }
    }

    return <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 70,
        width: '100%',
        border: 'solid 1px'
    }}>
        <CardActions sx={{
            display:'flex',
            width: '100%'
        }}>
            <FormControl sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
            }}> 
                <TextField  size='small' type={"number"} label="ID" sx={{width: 100}} onChange={(e) => task.setId(e.target.value)}/>
                <TextField size='small' type={"name"} label="Name"  sx={{ marginLeft: 1, width: 350, }} onChange={(e) => task.setName(e.target.value)}/>
                <TextField size='small' type={"description"} label="Description"  sx={{ marginLeft: 1, width: '100%'}} onChange={(e) => task.setDescription(e.target.value)}/>
            </FormControl>
            <Box sx={{ display:'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: 2}}>
            <Button sx={{border: 2, 
                borderRadius: 2, 
                background: 'blue', ':hover': {background: 'white', border: 'solid 1px', borderColor: 'blue', color: 'blue'}, 
                color: 'white', 
                height: 50, 
                width: 90}}
                onClick={() => onClick()}>
                Search
            </Button>
            </Box>
        </CardActions>
    </Card>
}

export { SearchCard, task };