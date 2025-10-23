import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.js';
import Home from './Home.js';
import Task_List from './Task_List.js';
import Add_Task from './Add_Task.js';
import Delete_Task from './Delete_Task.js';
import Completed_Task from './Completed_Task.js';
import Edit_Task from './Edit_Task.js';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task_list" element={<Task_List />} />
        <Route path="/add_task" element={<Add_Task />} />
        <Route path="/delete_task" element={<Delete_Task />} />
        <Route path="/completed_task" element={<Completed_Task />} />
        <Route path="/edit_task" element={<Edit_Task />} />
        <Route path="/edit_task/:taskId" element={<Edit_Task />} />
      </Routes>
    </Router>
  );
}

export default App;
