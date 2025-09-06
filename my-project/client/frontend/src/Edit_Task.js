import {useState,useEffect } from "react";
import "./Edit_Task.css";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
const Edit_Task=()=>{
    const [tasks,setTask]= useState([]);
    const [popup,setPopup]=useState(false);
    const navigate=useNavigate();
    const [edittask,setEditTask]=useState({
      taskname:"",
      priority:"",
      datetime:"",
      time:"",
      status:""
    })
    const [selectedtaskid,settaskid]=useState(null);
    const gettask=()=>{

        fetch('https://tasktracker-2ltg.onrender.com/tasks')
        .then(response=>response.json())
        .then(data=>{
            setTask(data);
            
            
        })


        .catch(err=>console.log("error fetching:",err));
    };
    

    
    useEffect(()=>{
        gettask();
    },[]);

    const handleEdit=(taskid)=>{
      console.log(taskid);
      const tasktoedit=tasks.find(task=>task._id===taskid);
      setEditTask({
        taskname: tasktoedit.taskname,
        priority: tasktoedit.priority,
        datetime: tasktoedit.datetime,
        time: tasktoedit.time,
        status: !tasktoedit.status
      });

      settaskid(taskid);
      console.log(edittask);
      setPopup(true);
    }
    const handleChange=(e)=>{
      const {name,value}=e.target;
      setEditTask(prev=>({...prev,[name]:value}));
    };
    const handleStatus=(e,taskid)=>{
      const newstatus= e.target.checked;
      fetch(`http://localhost:5000/taskstatus/${taskid}`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({status:newstatus}),
      })
      .then((response)=>response.json())
      .then(()=>{
        setTask((prevTasks)=>
          prevTasks.map((task)=> task._id === taskid ? {...task,status:newstatus}:task));
      })
      setEditTask((prev)=>({...prev,status:e.target.checked}));
    }
    const handleSave=()=>{
      console.log("saving");
      fetch(`http://localhost:5000/tasks/${selectedtaskid}`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edittask),
        
        
      })
      .then((response)=>response.json())
      .then(()=>{
        setPopup(false);
        
      })
      
      .catch((err)=>console.log("error saving:",err));
      gettask();
    }
    
    return(
        <div className="tasklistdiv">
            <label className="titletext"><h3>TASK LIST</h3></label>
            <table className="tasktable">
              <thead>
                <tr>
                  <th>TASK NAME</th>
                  <th>PRIORITY</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>ACTION</th>
                  <th>STATUS</th>
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
                      
                      <td className="update">
                        <button className="deletetaskbutton" onClick={()=>handleEdit(task._id)}>UPDATE</button>
                        
                      </td>
                      <td className="status">{<label class="switch">
                            <input id="checkbox1" type="checkbox" checked={task.status} onChange={(e)=>handleStatus(e,task._id)}/>

                            <span class="slider round"></span>
                          </label>}</td>
                    </tr>
                    
                    

                  )
                )):<tr>
                    <td colSpan="4">No tasks</td>
                  </tr>}
              </tbody>
            </table>

            {popup && (
              <div className="popup">
                <div className="popupcontent">
                  <h3>Edit task</h3>
                  <label>Task Name:
                    <input type="text" name="taskname" value={edittask.taskname} onChange={handleChange}/>
                  </label>
                  <label>Priority:  
                    <input type="text" name="priority" value={edittask.priority} onChange={handleChange}/>
                  </label>
                  <label>
                    Date:
                    <input type="date" name="datetime" value={edittask.datetime} onChange={handleChange}/>
                  </label>
                  <label>
                    Time:
                    <input type="time" name="time" value={edittask.time} onChange={handleChange}/>
                  </label>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={()=>setPopup(false)}>Cancel</button>
                </div>
              </div>
              
            )}
            
            
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
export default Edit_Task;


// import { useState, useEffect } from "react";
// import "./Task_List.css";
// import { useNavigate } from "react-router-dom";
 
// const Edit_Task = () => {
//   const [tasks, setTask] = useState([]);
//   const [popup, setPopup] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState(null); // New state for editing a specific task
//   const [editedTask, setEditedTask] = useState({
//     taskname: '',
//     priority: '',
//     datetime: '',
//     time: ''
//   });
  
//   const navigate = useNavigate();
 
//   const gettask = () => {
//     fetch('http://localhost:5000/tasks') // Specify your API URL here
//       .then(response => response.json())
//       .then(data => {
//         setTask(data);
//         console.log(data);
//       })
//       .catch(err => console.log("error fetching:", err));
//   };
 
//   useEffect(() => {
//     gettask();
//   }, []);
 
//   const handleEdit = (taskId) => {
//     // Find the task from the list based on taskId and set it as the task to be edited
//     const task = tasks.find(t => t.id === taskId);
//     setTaskToEdit(task);
//     setEditedTask({
//       taskname: task.taskname,
//       priority: task.priority,
//       datetime: task.datetime,
//       time: task.time
//     });
//     setPopup(true); // Show the popup when "UPDATE" button is clicked
//   };
 
//   const handleSave = () => {
//     // Logic to save the edited task (e.g., API call to update the task)
//     // You can send `editedTask` to the server and update it.
//     console.log("Saving task:", editedTask);
//     setPopup(false); // Close the popup after saving
//   };
 
//   const handleCancel = () => {
//     setPopup(false); // Close the popup without saving
//   };
 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedTask((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
 
//   return (
//     <div className="tasklistdiv">
//       <label className="titletext">TASK LIST</label>
//       <table className="tasktable">
//         <thead>
//           <tr>
//             <th>TASK NAME</th>
//             <th>PRIORITY</th>
//             <th>DATE</th>
//             <th>TIME</th>
//             <th>ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(tasks) && tasks.length > 0 ? (
//             tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.taskname}</td>
//                 <td>{task.priority}</td>
//                 <td>{task.datetime}</td>
//                 <td>{task.time}</td>
//                 <td>
//                   <button
//                     className="deletetaskbutton"
//                     onClick={() => handleEdit(task.id)} // Pass task id for editing
//                   >
//                     UPDATE
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No tasks</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
 
//       {/* Notification popup */}
//       {popup && (
//         <div className="notification">
//           <div className="notification-content">
//             <h3>Edit Task</h3>
//             <label>
//               Task Name:
//               <input
//                 type="text"
//                 name="taskname"
//                 value={editedTask.taskname}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Priority:
//               <input
//                 type="text"
//                 name="priority"
//                 value={editedTask.priority}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Date:
//               <input
//                 type="text"
//                 name="datetime"
//                 value={editedTask.datetime}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Time:
//               <input
//                 type="text"
//                 name="time"
//                 value={editedTask.time}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <div className="notification-actions">
//               <button onClick={handleCancel}>Cancel</button>
//               <button onClick={handleSave}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default Edit_Task;
 


 
 

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

