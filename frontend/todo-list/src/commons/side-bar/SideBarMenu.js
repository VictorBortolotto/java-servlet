import { Icon, List, ListItem, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import './SidebarStyle.css'

const SideBarMenu = () => {

    return <>
        <div className='navbar'>
            <div className='logo' style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center'
            }}>
                <img src={require('../assets/to_do_4.png')} alt='logo' style={{
                    width: '100%',
                    height: '100%'
                }}></img>
            </div>
            <div style={{width: '100%', background: 'rgb(48, 106, 212);' }}>
                <List sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'right', 
                    justextAlign: 'right',
                    height: '100%', 
                    width: '100%'
                }}>
                    <ListItem className='list-item' button={true} component={Link} {...{to: "/home"}} sx={{
                        display: 'flex',
                        alignItems: 'right', 
                        justextAlign: 'right',
                        width: '100%'
                    }}>
                        <ListItemIcon sx={{
                            display: 'flex',
                            alignItems: 'center', 
                            justextAlign: 'center',
                            width: '100%', 
                            color: 'white'
                        }}>
                            <Icon sx={{ height: '100%'}}>
                                <HomeIcon className='icon' sx={{color: 'white'}}></HomeIcon>
                            </Icon>
                            <Typography component="div" sx={{width: '100%', textAlign: 'center', color: 'white'}}>
                                HOME
                            </Typography>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem className='list-item' button={true} component={Link} {...{to: "/pending"}} sx={{width: '100%'}}>
                        <ListItemIcon sx={{
                            display: 'flex',
                            alignItems: 'center', 
                            justextAlign: 'center',
                            width: '100%', 
                            color: 'white'
                        }}>
                            <Icon sx={{ height: '100%'}}>
                                <PendingActionsIcon className='icon' sx={{color: 'white'}}></PendingActionsIcon>
                            </Icon>
                            <Typography component="div" sx={{width: '100%', textAlign: 'center', color: 'white'}}>
                                PENDING
                            </Typography>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem className='list-item' button={true} component={Link} {...{to: "/done"}} sx={{width: '100%'}}>
                        <ListItemIcon sx={{
                            display: 'flex',
                            alignItems: 'center', 
                            justextAlign: 'center',
                            width: '100%', 
                            color: 'white'
                        }}>
                            <Icon sx={{ height: '100%'}}>
                                <DoneIcon className='icon' sx={{color: 'white'}}></DoneIcon>
                            </Icon>
                            <Typography component="div" sx={{width: '100%', textAlign: 'center', color: 'white'}}>
                                DONE
                            </Typography>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </div>
        </div>
    </>
    
}

export { SideBarMenu }