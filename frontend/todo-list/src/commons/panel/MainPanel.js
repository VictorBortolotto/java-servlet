import React from 'react';
import { DoneTasksCard } from '../cards/DoneTasksCard';
import { PenndingTasksCard } from '../cards/PenddingTaskCard';

import './MainPanel.css'

const  MainPanel = () => {
    
    return <>
        <div className='container'>
            <header className='panel-header'>
                <DoneTasksCard></DoneTasksCard>
                <PenndingTasksCard></PenndingTasksCard>
            </header>
            <content className='panel-content'>

            </content>
            <footer className='panel-footer'>

            </footer>
        </div>
    </>
}

export { MainPanel };