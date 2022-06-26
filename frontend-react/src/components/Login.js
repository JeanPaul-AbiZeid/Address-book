import React from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigation = useNavigate();
  return (
    <div className="main">
        <div className="form-container">
            <h1>Sign In</h1>
            <form id="form">
                <div className="flex"><input type="text" placeholder="Email address" id="email" onChange={(e) => {setEmail(e.target.value);}}/></div>
                <div><input type="password" placeholder="Password" id="password" onChange={(e) => {setPassword(e.target.value);}}/></div>
                <div id="pass">
                    <input type="checkbox" id="toggle" onClick={
                        function reveal() {
                            var x = document.getElementById("password");
                            if (x.type === "password") {
                                x.type = "text";
                            } else {
                                x.type = "password";
                            }
                            }}/>
                    Show Password
                </div>
                <button type="submit" className="btn btn-gray" onClick={
                    
                    function onSubmit(e){
                    e.preventDefault();

                    let req = {"email" : email, "password" : password}

                    axios({
                        method: 'post',
                        url: 'http://localhost:8080/api/user/auth/login', 
                        data: req,
                      })
                      .then(function (response) {
                        Navigation(`/Contacts/${response.data.id}`)
                        
                      })
                      .catch(function (error){
                        console.log(error)
                        alert("Incorrect email or password");
                      })
                    }
                    }
                >Log in</button>
                
                <h4>New account? <Link to="/Signup">Sign up</Link></h4>
            </form>
        </div>
    </div>

    
    
  );
};

export default Login;