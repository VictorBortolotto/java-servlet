import React from 'react';
import { EditableTasksCard } from '../../commons/cards/EditableTasksCard';
import { HeaderCard } from '../../commons/cards/HeaderCard';
import { AddtaskFab } from '../../commons/fab/AddTaskFab';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './PendingTasksPage.css'


const PendingTasksPage = () => {

    return <>
        <div className='main-pendding-tasks'>
            <aside className='aside-pendding-tasks'>
                <SideBarMenu></SideBarMenu>
            </aside>
            <header className='header-pendding-tasks'>
                <HeaderCard title={'PENDING'}></HeaderCard>
            </header>
            <content className='content-pendding-tasks'>
                <EditableTasksCard taskStatus={false}></EditableTasksCard>
            </content>            
            <footer className='footer-pendding-tasks'>
                <AddtaskFab></AddtaskFab>
            </footer>
        </div>
    </>

}

export { PendingTasksPage }