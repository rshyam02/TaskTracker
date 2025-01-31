import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './Login.js'
import Home from './Home.js'
import Task_List from './Task_List.js';
import Add_Task from './Add_Task.js';
import Delete_Task from './Delete_Task.js';
import Completed_Task from './Completed_Task.js';
import Edit_Task from './Edit_Task.js';


import './App.css';

function App() {
  return (
    // <Login></Login>
    <Router>
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/Home" Component={Home}></Route>
        <Route path="/Task_List" Component={Task_List}></Route>
        <Route path="/Add_Task" Component={Add_Task}></Route>
        <Route path="/Delete_Task" Component={Delete_Task}></Route>
        <Route path="/Completed_Task" Component={Completed_Task}></Route>
        <Route path="/EditTasks" Component={Edit_Task}></Route>
        <Route path="./EditTasks/:taskId"Component={Edit_Task}></Route>


        
      </Routes>
    </Router>
  );
}

export default App;
