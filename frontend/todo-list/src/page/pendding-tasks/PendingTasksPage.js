import React from 'react';
import { TaskEditablePanel } from '../../commons/panel/task-editable-panel/TaskEditablePanel';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './PendingTasksPage.css'


const PendingTasksPage = () => {

    return <>
        <div className='main'>
            <header className='header'>

            </header>
            <aside className='aside'>
                <SideBarMenu></SideBarMenu>
            </aside>
            <content className='content'>
                <TaskEditablePanel status={false}></TaskEditablePanel>
            </content>            
        </div>
    </>

}

export { PendingTasksPage }