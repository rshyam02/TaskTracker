import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Login.css';
const Login=()=>{
    const[username,setuser]=useState('');
    const[password,setpass]=useState('');
    const[message,setmessage]=useState('');

    const navigate=useNavigate('');

    const handleform=async(e)=>{
        e.preventDefault();
        
        const response=await fetch("https://tasktracker-2ltg.onrender.com/login",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        });
        const data= await response.text();
        if(data=="Login successful"){
            navigate('\Home');
        }
        setmessage(data);
            //ssetmessage(data);
        
    };
    return(
        <div className="login-container">
            <form onSubmit={handleform} className='loginform'>
                <div className="Logindiv">                <input className="username" type='text' value={username} placeholder='username' onChange={(e)=>setuser(e.target.value)}></input>
                </div>
                <div className="Logindiv">
                                    <input className="password" type='text' value={password} placeholder='password' onChange={(e)=>setpass(e.target.value)}></input>
                </div>
                {/* <br></br>
                <br></br> */}
                <div className="submitdiv">
                                <button type="submit">submit</button>
                </div>
                
                
            </form>
            {message && <p className='authenticatemsg'>{message}</p>}
        </div>
    );
};
export default Login;
// import React, { useState } from 'react';
 
// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
 
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ username, password })
//             });
 
//             const data = await response.text();
//             setMessage(data);
//         } catch (error) {
//             setMessage('Error: ' + error.message);
//         }
//     };
 
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };
 
// export default Login;
 // Login.js (React Component)
 
// import React, { useState } from 'react';
// import axios from 'axios';
 
// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [welcomeMessage, setWelcomeMessage] = useState('');
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     try {
//       // Step 1: Send login request
//       const response = await axios.post('http://localhost:5000/login', { username, password });
      
//       setMessage(response.data.message); // Authentication success message
 
//       // Step 2: After successful login, get the welcome message
//       if (response.data.message === 'Authentication successful') {
//         const welcomeResponse = await axios.get(`http://localhost:5000/welcome/${username}`);
//         setWelcomeMessage(welcomeResponse.data.message);
//       }
//     } catch (error) {
//       setMessage(error.response ? error.response.data.message : 'An error occurred');
//       setWelcomeMessage('');
//     }
//   };
 
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
 
//       {message && <p>{message}</p>}
//       {welcomeMessage && <p>{welcomeMessage}</p>}
//     </div>
//   );
// };
 
// export default Login;
 
