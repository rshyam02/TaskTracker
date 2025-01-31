import {useState,useEffect } from "react";
import "./Task_List.css";
import { useNavigate } from "react-router-dom";
const Task_List=()=>{
    const [tasks,setTask]= useState([]);
    const navigate=useNavigate();

    const gettask=()=>{

        fetch('http://localhost:5000/tasks')
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
        <div className="tasklistdiv">
            <label className="titletext">TASK LIST</label>
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
            <button className="edittaskbtn" onClick={()=>navigate('\EditTasks')}>EDIT TASK</button>
            {/* <ul>
                {tasks.map((task,index)=>{
                    <li key={index}>
                        {task.taskname} - {task.priority} - {task.datetime} - {task.time}
                    </li>
                })}
            </ul> */}
        </div>
        
    )
};
export default Task_List;

// import { useState, useEffect } from "react";
// import "./Task_List.css";
 
// const Task_List = () => {
//   const [tasks, setTask] = useState([]);
 
//   const gettask = () => {
// fetch('http://localhost:5000/tasks')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched data:", data);
//         setTask(data); // Update state with the fetched data
//       })
//       .catch((err) => console.log("Error fetching:", err));
//   };
 
//   useEffect(() => {
//     gettask(); 
//   }, []); 
 
//   return (
//     <div className="tasklistdiv">
//       <label className="titletext">TASK LIST</label>
//       <table className="task-table">
//         <thread>
//             <tr>
//                 <th>Task name</th>
//                 <th>Priority</th>
//                 <th>Date</th>
//                 <th>Time</th>
//             </tr>
//         </thread>
//         <tbody>
//         {Array.isArray(tasks) && tasks.length > 0 ? (
//           tasks.map((task, index) => (
//             <tr key={task.id}>
//                 <td>{task.taskname}</td>
//                 <td>{task.priority}</td>
//                 <td>{task.datetime}</td>
//                 <td>{task.time}</td>
//             </tr>
//           ))):(<tr><td colSpan="4">No tasks</td></tr>)}
//         </tbody>
//       </table>
//       {/* <ul>
//         {Array.isArray(tasks) && tasks.length > 0 ? (
//           tasks.map((task, index) => (<li key={
// task.id}> 
//               <div>
//                 <strong>Task Name:</strong> {task.taskname}
//               </div>
//               <div>
//                 <strong>Priority:</strong> {task.priority}
//               </div>
//               <div>
//                 <strong>Date:</strong> {task.datetime}
//               </div>
//               <div>
//                 <strong>Time:</strong> {task.time}
//               </div>
//               {task.taskname} - {task.priority} - {task.datetime} - {task.time}
//             </li>
//           ))
//         ) : (
//           <li>No tasks available</li>  // Fallback message if no tasks
//         )}
//       </ul> */}
//     </div>
//   );
// };
 
// export default Task_List;