import {React,useEffect,useState} from "react";
import './Delete_Task.css';
const Delete_Task=()=>{
    const [tasks,setTask]=useState([]);
    const gettask=()=>{
        fetch('http://localhost:5000/tasks')
        .then(response=>response.json())
        .then(data=>{
            setTask(data);
        })
        .catch(err=>console.log("error fetcing:",err));
    };
    const deletetask=(taskid)=>{
        fetch(`http://localhost:5000/tasks/${taskid}`,{
          method: 'DELETE'

        })
        .then(response=>response.json())
        .then(data=>{console.log(data.message); gettask();})
        
        .catch(err=>console.log("error fetching tasks:",err));
        

    };
    useEffect(()=>{
        gettask();
    },[]);

    return(
        <div className="tasklistdiv">
          <div>
            
          </div>
            <label className="titletext">DELETE LIST</label>
            <table className="tasktable">
              <thead>
                <tr>
                  <th>TASK NAME</th>
                  <th>PRIORITY</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>ACTION</th>
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
                      <td>
                        <button className="deletetaskbutton"onClick={()=>deletetask(task._id)}>DELETE</button>
                      </td>
                    </tr>
                    

                  )
                )):<tr>
                    <td colSpan="4">No tasks</td>
                  </tr>}
              </tbody>
            </table>
            
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
export default Delete_Task;