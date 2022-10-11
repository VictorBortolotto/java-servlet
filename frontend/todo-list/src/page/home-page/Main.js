import React from 'react';
import { MainPanel } from '../../commons/panel/MainPanel';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './Main.css'


const Main = () => {

    return <>
        <div className='main'>
            <header className='header'>

            </header>
            <aside className='aside'>
                <SideBarMenu></SideBarMenu>
            </aside>
            <content className='content'>
                <MainPanel></MainPanel>
            </content>            
        </div>
    </>

}

export { Main }