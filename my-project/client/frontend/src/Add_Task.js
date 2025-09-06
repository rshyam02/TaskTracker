import React,{useState} from "react";
import './Add_Task.css';
const Add_Task=()=>{
    const [taskname,settask]=useState('');
    const [tasknamestatus,settasknamestatus]=useState('');
    const [priority,setpriority]=useState('high');
    const [datetime,setdatetime]=useState('');
    //let tasknamestatus;
    const handleinput=async(e)=>{
        e.preventDefault();
        //settask(taskname);
            console.log(datetime);
        // console.log(taskname);
        
        const response=await fetch(" https://tasktracker-2ltg.onrender.com/taskname",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({taskname,priority,datetime})
        });
            const data= await response.text();
            console.log(data);
            settasknamestatus(data);
            
            // if(data=="Message recieved successsfully"){
            //     tasknamestatus="Message recieved successsfully";
            // }
            
            //setmessage(data);
        


    };
    
    return(
        <div className="taskaddcontainer">
            <label className="addtasktitle">ADD TASK</label>
            <form onSubmit={handleinput}>
                <div className="rowcontainer">
                     <input className="addtaskfield" value={taskname}  type="text" placeholder="add your task"  onChange={(e)=>settask(e.target.value)}></input>
                     <label className="prioritymenu" htmlFor="importance">Select priority</label>
                     <select className="priorityselector"name="importance" id="importance" value={priority} onChange={(e)=>setpriority(String(e.target.value))}>    
                        <option value="high" >high</option>
                        <option value="low">low</option>
                     </select>
                     <label className="datetime_label" htmlFor="datetime">Set date and time</label>
                     <input className="datetime_input" type="datetime-local" value={datetime} onChange={(e)=>setdatetime(e.target.value)}></input>

                </div>
                <button className="submitbutton" type="submit">SUBMIT</button>
            </form>
            
            {tasknamestatus && <label className="status">SUCCESSFULLY SAVED!!</label>}
        </div>
    )
};
export default Add_Task;
