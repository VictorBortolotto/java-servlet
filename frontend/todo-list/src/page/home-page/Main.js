import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import React from 'react';
import { SearchCard } from '../../commons/cards/SearchCard';
import { TaskCard } from '../../commons/cards/TaskCard';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './Main.css'

import { Grid, ListItem } from "@mui/material";

const Main = () => {

    return <>
        <div className='main'>
            <SideBarMenu></SideBarMenu>
            <div className='content'>
                <header className='header'>
                    <SearchCard></SearchCard>
                </header>
                <div className='cards'>
                    <Grid container columns={10}>
                        {[0,1,2,3,4,5].map(() => (
                            <Grid item xs={5} >
                                <ListItem id='list'>
                                    <TaskCard taskName={'Task Name'} description={'Task Description'}></TaskCard>
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <footer className='footer'>
                    <Fab size='large' color="primary" aria-label="add" sx={{
                        height: 60,
                        width: 60
                    }}>
                        <Add sx={{
                            height: 35,
                            width: 35
                        }}/>
                    </Fab>      
                </footer>   
            </div>
            
            
        </div>
    </>

}

export { Main }