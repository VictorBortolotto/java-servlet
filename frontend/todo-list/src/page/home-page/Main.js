import React from 'react';
import { HeaderCard } from '../../commons/cards/HeaderCard';
import { InformationTaskCard } from '../../commons/cards/InformationTaskCard';
import { AddtaskFab } from '../../commons/fab/AddTaskFab';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './Main.css'


const Main = () => {

    return <>
        <div className='main'>
            <aside className='aside'>
                <SideBarMenu></SideBarMenu>
            </aside>
            <header className='header'>
                <HeaderCard title={'WELCOME'}></HeaderCard>
            </header>
            <content className='content'>
                <InformationTaskCard></InformationTaskCard>
            </content>            
            <footer className='footer'>
                <AddtaskFab></AddtaskFab>
            </footer>
        </div>
    </>

}

export { Main }