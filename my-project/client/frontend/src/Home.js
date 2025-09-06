import React from 'react';
import Menu from './Menu.js'
import {useState,useEffect } from "react";
import './Home.css'
const Home=()=>{
    const [tasks,setTask]= useState([]);
     
    
        const gettask=()=>{
    
            fetch('https://tasktracker-2ltg.onrender.com/tasks')
            .then(response=>response.json())
            .then(data=>{
                setTask(data);
                console.log(data);
                
            })
    
            .catch(err=>console.log("error fetching:",err));
        };
        
        useEffect(()=>{
            gettask();
        },[]);
    return(
        <div className='home'>
            <menu>
                <Menu></Menu>
            
            </menu>
            <div className="tasklistdiv">
            {/* <label className="titletext">TASK LIST</label> */}
            <table className="tasktable">
              <thead>
                <tr>
                  <th>TASK NAME</th>
                  <th>PRIORITY</th>
                  <th>DATE</th>
                  <th>TIME</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tasks) && tasks.length>0?(
                  tasks.map((task,index)=>(
                    
                    <tr key={task.id}>
                      <td>{task.taskname}</td>
                      <td>{task.priority}</td>
                      <td>{task.datetime}</td>
                      <td>{task.time}</td>
                    </tr>
                    

                  )
                )):<tr>
                    <td colSpan="4">No tasks</td>
                  </tr>}
              </tbody>
            </table>
            {/* <button className="edittaskbtn" onClick={()=>navigate('\EditTasks')}>EDIT TASK</button> */}
            {/* <ul>
                {tasks.map((task,index)=>{
                    <li key={index}>
                        {task.taskname} - {task.priority} - {task.datetime} - {task.time}
                    </li>
                })}
            </ul> */}
        </div>

        </div>
        
    );
};
export default Home;
