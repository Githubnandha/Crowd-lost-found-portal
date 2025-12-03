import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/login.css";

export default function Login() {
    const [data,setData] = useState({
        username: "",
        password: ""
    }); 
    const navigate = useNavigate();
    const [message,setMessage] = useState("");

    const handleSubmit = async (e)=> {
        let response;
        try {
            e.preventDefault();
            response = await axios.post("http://localhost:5000/user/login",data);
            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user_id",response.data.user_id);
            localStorage.setItem("profile_photo",response.data.profile_photo);
            if('login successful'=== response.data.message) {
               navigate("/get-all-items");            
            }
        }
        catch(error) {
            console.log(`Error ${error.response.data.message}`);
            setMessage(error.response.data.message);
        }
    }
    return(
    <>
      <div className="login-container">
      <h1 className="heading">Login</h1>
      <form onSubmit={handleSubmit} id="loginForm"  autoComplete="off">
         <div className="form-group">
         <label htmlFor="username">Username</label>
         <input 
            type="text" 
            name="username"
            value={data.username}
            onChange={(e)=>setData((prev)=>({...prev,[e.target.name]:e.target.value}))}
            placeholder="Enter Username: "
            required
            />      
         </div>
         <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
                type="password"
                name="password" 
                value={data.password}
                onChange={(e)=>setData((prev)=>({...prev,[e.target.name]:e.target.value}))}
                placeholder="Enter Password: "
                required/> 
         </div>
         <button type="submit" className="login-btn" id="loginBtn">Login</button> <br/>
         <div className="register-link">
            <Link to="/register">Don't have account?</Link>
          </div>
      </form>
      {message && <div id="message" className="message">{message}</div>}
      </div>
    </>
    );
}