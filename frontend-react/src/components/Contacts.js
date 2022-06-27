import React, {useState, useEffect} from "react";
import '../App.css';
import { useParams } from "react-router-dom";
import Contact from "./Contact";
import axios from 'axios';

const Contacts = () => {
    const {id} = useParams()
    const [contacts, setContacts] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleClick = event => {
        //  toggle isActive state on click
        setIsActive(current => !current);
      };
    
    useEffect(() => {
    //Accepts a function to perform on certain changes
    const getContacts = async () => {
        const Contacts = await fetchContacts();
        setContacts(Contacts);
    };
    getContacts();
    }, []);

    useEffect(() => {
    const getContacts = async () => {
        const Contacts = await fetchContacts();
        setContacts(Contacts);
    };
    getContacts();
        });
    
    
    const fetchContacts = async () => {

        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        try {
            const res = await fetch("http://localhost:8080/api/contact/?user_id=" + id, {headers: myHeaders});
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Deleting Contact according to id
    const deleteContact = async (contact_id) => {
        const res = await fetch("http://localhost:8080/api/contact/?id=" + contact_id, {
        method: "DELETE",
        });

        // Checking Deletion Status
        res.status === 200
        ? alert("Contact Deleted")
        : alert("Error Deleting");
    };


    return (
    <div className="contacts">
        <button className={!isActive ? "show add" : "hide"}
        onClick={function toggle(){
            handleClick();}}>Add Contact</button>
        <form className={isActive ? "show form" : "hide"}>
            <input id="name" placeholder="Name" onChange={(e) => {setName(e.target.value);}}></input><br/>
            <input id="number" placeholder="Number" onChange={(e) => {setNumber(e.target.value);}}></input><br/>
            <input id="status" placeholder="Status" onChange={(e) => {setStatus(e.target.value);}}></input><br/>
            <input id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value);}}></input><br/>
            <div className="buttons-container">
                <button className="location-button">Location</button>
                <button className="create" onClick={
                function Create(e){
                e.preventDefault();
                handleClick();
                let req = {"email" : email, "name" : name, "number" : number, "status" : status, "user_id" : id, "lat": 1, "long" : 1 }

                axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/contact', 
                    data: req,
                    })
                    .then(function (response) {
                        document.getElementById("name").value = "";
                        document.getElementById("number").value = "";
                        document.getElementById("status").value = "";
                        document.getElementById("email").value = "";
                    })
                    .catch(function (error){
                    console.log(error)
                    })
                }
                }
                >Create</button>
            </div>
            
        </form>
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Location</th>
                </tr>
                
                {contacts.length === 0
                    ? "No Contacts Yet"
                    : contacts.map((contacts, index) => {
                        return  <Contact
                            key = {index}
                            id = {contacts._id}
                            name = {contacts.name}
                            number = {contacts.number}
                            email = {contacts.email}
                            status = {contacts.status}
                            location = "Show Location"
                            onDelete={deleteContact}
                        />}
                        )}
            </tbody>
            
        </table>
    </div>
        
    );
  };

export default Contacts;