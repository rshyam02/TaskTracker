import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import './Menu.css'
import {useNavigate} from "react-router-dom";
// import {Add_Note} from './Add_Note.js'
// import {Update_Note} from './Update_note.js'
// import {View_Note} from './View_Note.js'
// import {Delete_Note} from './Delete_Note.js'
 
import { useLocation } from 'react-router-dom';
 
 
const Menu=({name,pass})=>{
    const navigateprofile= useNavigate();
    console.log(name,pass);
    const[sidebarstatus,setsidebarstatus]=useState(false);
 
    const togglesidebar=()=>{
        setsidebarstatus(!sidebarstatus);
    }
    // const [totaltasks,settotaltasks]=useState();
    // const [completedtasks,setcompletedtasks]=useState();
    // const [pendingtasks,setpendingtasks]=useState();
    // const [high_prioritytasks,sethightprioritytasks]=useState();
    // const [low_prioritytasks,setlowprioritytasks]=useState();
    const [taskinfo,settaskinfo]=useState({
        completed:"",
        high_priority:"",
        low_priority:"",
        not_completed:"",
        total_task:""
 
    })
    const status=()=>{
        fetch('https://tasktracker-2ltg.onrender.com/taskstatus')
        .then(response=>response.json())
        .then(data=>{
            console.log("recieved data");
            console.log(data);
           settaskinfo(data);
           
        })
        .catch(err=>console.log("error fetching:",err));
 
    }
    useEffect(()=>{
        status();
    },[]);
 
   
   
    // const location=useLocation();
    // const {name}=location.state ||{};
    return(
        <div>
            <div className="Menudiv">
            {/* <button class="hamburger_icon" onClick={togglesidebar}><img class="hamimage"src="hamnurger_icon.png" alt="="></img></button> */}
 
            {/* <button className="opensidebar" onClick={opensidebar()}></button>
            <script>
                function opensidebar {
 
                }
            </script> */}
           
                <button className="hamburger_icon" onClick={togglesidebar}><img className="hamimage"src="/hamburger_icon.jpg" alt="="/></button>
 
                <div  className={`sidebar ${sidebarstatus ? "open": ""}`}>
 
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <ul>
                        <li><a href="#"><Link to='/EditTasks'>Update Task</Link></a></li>
                        <li><a href="#"><Link to='/Add_Task'>Add Task</Link></a></li>
                        <li><a href="#"><Link to='/Delete_Task'>Delete Task</Link></a></li>
                       
                    </ul>
                </div>
                {/* <script>
                    function togglesidebar() {
                        var sidebar=document.getElementsByClassName("sidebar");
                        var hamburger=document.getElementsByClassName("hamburger_icon");
                       
                    }
                   
                </script> */}
                {/* <div className={`content ${sidebarstatus ? "shifted": ""}`}>
                    <h1>Welcome to My Website</h1>
                   
                </div> */}
               
            </div>
            <div className="website1_title">
                   
            </div>
            <p className="pp"><h1></h1></p>
            <div className="taskstatus_box">
                <div className="taskstatus">
                    <div className="totaltask">
                        <label ><b>Total Task </b></label>
                        <span>{taskinfo.total_task}</span>
                       
                    </div>
                    <div className="completed">
                        <label><b>Completed Task</b> </label>
                        <span>{taskinfo.completed}</span>
 
                    </div>
                    <div className="notcompleted">
                        <label><b>Pending Task </b></label>
                        <span>{taskinfo.not_completed}</span>
 
                    </div>
                    <div className="highpriority">
                        <label><b>High Priority Task </b></label>
                        <span>{taskinfo.high_priority}</span>
                    </div>
                    <div className="lowpriority">
                        <label><b>less Priority Task </b></label>
                        <span>{taskinfo.low_priority}</span>
                    </div>
                   
                   
                </div>
            </div>
           
 
        </div>
       
        // <nav className="menu">
        //     <ul>
   
        //         <li>
        //             <Link to='/Profile'>Profile</Link>
        //         </li>
        //         <li>
        //             <Link to="/Settings">Settings</Link>
        //         </li>
        //         <li>
        //             <Link to="/About">About</Link>
        //         </li>
        //         <li>
        //             <Link to="/Contact">Contact</Link>
        //         </li>
        //         <li>
        //             <Link to="/Logout">Logout</Link>
        //         </li>
        //     </ul>
        // </nav>
 
    )
}
export default Menu;
 
