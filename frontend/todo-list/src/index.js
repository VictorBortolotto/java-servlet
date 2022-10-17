import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Main } from './page/home-page/Main';
import { DoneTasksPage } from './page/done-tasks/DoneTasksPage';
import { PendingTasksPage } from './page/pendding-tasks/PendingTasksPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path="/">
        <Route path="home" element={<Main/>}></Route>
        <Route path="done" element={<DoneTasksPage/>}></Route>
        <Route path="pending" element={<PendingTasksPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
