import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../css/login.css";

export default function Register(){
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [data,setData] = useState({
        username:"",
        contact_number:"",
        email:"",
        password:""
    });
    const [message,setMessage] = useState("");
    /*const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }*/
       const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        if (selectedFile) {
            setFileName(selectedFile.name);
            
            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setFileName("");
            setImagePreview(null);
        }
    }
    const handleChange = (e) => {
        setData((prev)=>({
            ...prev, [e.target.name] : e.target.value}
        ))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("profile_photo",file);
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key]);
            });
            const response = await axios.post("http://localhost:5000/user/register",formData);
            console.log(response.data.message);
            setMessage(response.data.message);
        }catch (error){
            console.log(error);
        }
    }
    return (
        <>
           <div className="register-container">
              <h1 className="heading">Register</h1>
           <form onSubmit={handleSubmit} autoComplete="off" id="registerForm">
                   <div className="form-group">
                   <label htmlFor="profile_photo">Add Profile Photo</label>
                   <div className="file-upload-container">
                       <input
                            type="file"
                            id="profile_photo"
                            name="profile_photo"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="file-upload-input"
                       /> 
                       <label htmlFor="profile_photo" className="file-upload-label">
                          <svg className="file-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                          </svg>
                          <span>{file ? fileName : "Choose profile photo"}</span>
                       </label>
                       {fileName && (
                           <div className="file-name">{fileName}</div>
                       )}
                       {imagePreview && (
                           <img src={imagePreview} alt="Preview" className="preview-image" />
                       )}
                   </div>
               </div>
               <div className="form-group">
                   <label htmlFor="username">Username</label>
                   <input 
                    type="text"
                    name="username"
                    id="username"
                    value={data.username}
                    onChange={handleChange}
                    placeholder="Enter username: "
               /> 
                </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter password: "
               /> 
                </div>
               <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    name="contact_number"
                    id="contactNumber"
                    value={data.contact_number}
                    onChange={handleChange}
                    placeholder="Enter contact number: "
               /> 
                </div>
               <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter email: "
               /> 
                </div>
               <button type="submit" className="register-btn" id="registerBtn">Register</button>
               {message && <div id="message" className="message">{message}</div>}
                <div className="login-link"><Link to="/">Back to Login</Link></div>
              </form>
           </div>
        </>
    );
}