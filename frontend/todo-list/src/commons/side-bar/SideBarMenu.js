import React, { useState } from 'react';

import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { AccountCircle, FormatListBulleted, Home, Newspaper } from '@mui/icons-material';

import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

const SideBarMenu = ({}) => {

    const [ collapsed, setCollapsed ] = useState(true);

    return <>
        <ProSidebar collapsed={collapsed}>
            <Menu iconShape='square'>
                <MenuItem active={true} icon={<FormatListBulleted />} onClick={() => setCollapsed(!collapsed)}>Menu</MenuItem>
                <MenuItem icon={<Home />} > 
                    <Link to="/home"/> 
                    Home
                </MenuItem>
                <MenuItem icon={<AccountCircle />}>
                    <Link to="/account"/>
                    Account
                </MenuItem>
                <MenuItem icon={<Newspaper/>}> 
                    <Link to="/notices"/> 
                    Notices
                </MenuItem>
            </Menu>
        </ProSidebar>
    </>
    
}

export { SideBarMenu }