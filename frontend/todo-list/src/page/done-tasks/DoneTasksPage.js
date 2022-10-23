import React from 'react';
import { EditableTasksCard } from '../../commons/cards/EditableTasksCard';
import { HeaderCard } from '../../commons/cards/HeaderCard';
import { AddtaskFab } from '../../commons/fab/AddTaskFab';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './DoneTasksPage.css'


const DoneTasksPage = () => {

    return <>
        <div className='main-done-tasks'>
            <aside className='aside-done-tasks'>
                <SideBarMenu></SideBarMenu>
            </aside>
            <header className='header-done-tasks'>
                <HeaderCard title={'DONE'}></HeaderCard>
            </header>
            <content className='content-done-tasks'>
                <EditableTasksCard taskStatus={true}></EditableTasksCard>
            </content>            
            <footer className='footer-done-tasks'>
                <AddtaskFab></AddtaskFab>
            </footer>
        </div>
    </>

}

export { DoneTasksPage }