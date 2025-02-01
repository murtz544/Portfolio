import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
import Login from './pages/Login';
import ManageProject from './pages/ManageProject';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/password/forget" element={<ForgotPassword/>}></Route>
        <Route path="/password/reset/:token" element={<ResetPassword/>}></Route>
        <Route path="/manage/skills" element={<ManageSkills/>}></Route>
        <Route path="/manage/timeline" element={<ManageTimeline/>}></Route>
        <Route path="/manage/projects" element={<ManageProject/>}></Route>
        <Route path="/view/project/:id" element={<ViewProject/>}></Route>
        <Route path="/update/project/:id" element={<UpdateProject/>}></Route>
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  )
}

export default App