import React from 'react';
import { TaskEditablePanel } from '../../commons/panel/task-editable-panel/TaskEditablePanel';

import { SideBarMenu } from '../../commons/side-bar/SideBarMenu';
import './DoneTasksPage.css'


const DoneTasksPage = () => {

    return <>
        <div className='main'>
            <header className='header'>

            </header>
            <aside className='aside'>
                <SideBarMenu></SideBarMenu>
            </aside>
            <content className='content'>
                <TaskEditablePanel status={true}></TaskEditablePanel>
            </content>            
        </div>
    </>

}

export { DoneTasksPage }