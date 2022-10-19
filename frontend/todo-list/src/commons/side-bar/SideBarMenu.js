import { Icon, List, ListItem, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneIcon from '@mui/icons-material/Done';

import './SidebarStyle.css';
import { Link } from 'react-router-dom';

const SideBarMenu = () => {

    return <>
        <div className='navbar'>
            <div className='logo' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src={require('../assets/to_do_4.png')} alt='logo' height={150} width={150}></img>
            </div>
            <List className='list'>
                <ListItem className='list-item' button={true} component={Link} {...{to: "/home"}}>
                    <ListItemIcon sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}><Icon><HomeIcon className='icon'></HomeIcon></Icon></ListItemIcon>
                    HOME
                </ListItem>
                <ListItem className='list-item' button={true} component={Link} {...{to: "/pending"}}>
                    <ListItemIcon sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}><Icon><PendingActionsIcon className='icon'></PendingActionsIcon></Icon></ListItemIcon>
                    PENDING
                </ListItem>
                <ListItem className='list-item' button={true} component={Link} {...{to: "/done"}} >
                    <ListItemIcon sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}><Icon><DoneIcon className='icon'></DoneIcon></Icon></ListItemIcon>
                    DONE
                </ListItem>
            </List>
        </div>
    </>
    
}

export { SideBarMenu }