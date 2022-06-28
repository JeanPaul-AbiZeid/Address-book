import React from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigation = useNavigate();
  return (
    <div>
        <nav className="top-nav">
                <h1>S-Maker</h1>
                <ul className="links">
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>
                        <button className="btn-white" onClick={
                            function login(){
                                Navigation("/")
                            }
                        }>Log In</button>
                    </li>
                </ul>
            </nav>
    
        <div className="main">
            <div className="form-container">
                <h1>New Account</h1>
                <form id="form">
                    <input type="text" placeholder="Full Name" id="full_name" onChange={(e) => {setName(e.target.value);}}/><br/>
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
                        
                        let data = {"name": name,
                        "email": email,
                        "password": password}
                        
                        axios({
                            method: 'post',
                            url: 'http://localhost:8080/api/user/auth/register',
                            data: data,
                        })
                        .then(function (response) {
                            if(!response == "error"){
                                alert("email already used or incorrect email format")
                            }
                            console.log(response)
                            
                            Navigation("/")  
                        })

                        .catch(function (error){
                            alert("Email already in use")
                            console.log(error);
                        })
        
                        }}>Sign up</button>
                </form>
            </div>
        </div>
    </div>
    
    
  );
};

export default Signup;