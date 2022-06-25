import React from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Signup = () => {
    const [first_name, setFname] = useState("");
    const [last_name, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigation = useNavigate();
  return (
    
        <div className="main">
            <div className="form-container">
                <h1>New Account</h1>
                <form id="form">
                    <input type="text" placeholder="First Name" id="first_name" onChange={(e) => {setFname(e.target.value);}}/><br/>
                    <input type="text" placeholder="Last Name" id="last_name" onChange={(e) => {setLname(e.target.value);}}/><br/>
                    <input type="text" placeholder="Email address" id="email" onChange={(e) => {setEmail(e.target.value);}}/><br/>
                    <input type="password" placeholder="Password" id="password" onChange={(e) => {setPassword(e.target.value);}}/>
                    <div id="pass"><input type="checkbox" id="toggle" onClick={
                            function reveal() {
                                var x = document.getElementById("password");
                                if (x.type === "password") {
                                    x.type = "text";
                                } else {
                                    x.type = "password";
                                }
                                }}/>Show Password</div>
                    <button type="submit" id = "sign_up" className="btn btn-gray" onClick={
                        function onSubmit(e){
                        e.preventDefault();
                        Navigation("/")
                        
                        
        
                        }}>Sign up</button>
                </form>
            </div>
        </div>

    
    
  );
};

export default Signup;