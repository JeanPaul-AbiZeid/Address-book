import React, {useState, useEffect} from "react";
import '../App.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Contact from "./Contact";

const Contacts = () => {
    const {id} = useParams()
    const [contacts, setContacts] = useState([]);
    const [isActive, setIsActive] = useState(false);

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
        console.log(contacts)
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


    return (
    <div className="contacts">
        <button className={!isActive ? "show add" : "hide"}
        onClick={function toggle(){
            handleClick();}}>Add Contact</button>
        <form className={isActive ? "show form" : "hide"}>
            <input placeholder="Name"></input><br/>
            <input placeholder="Number"></input><br/>
            <input placeholder="Status"></input><br/>
            <input placeholder="Email"></input><br/>
            <div className="buttons-container">
                <button className="location-button">Location</button>
                <button className="create" onClick={
                function Create(e){
                e.preventDefault();
                handleClick();
                }}>Create</button>
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
                            id = {contacts.id}
                            name = {contacts.name}
                            number = {contacts.number}
                            email = {contacts.email}
                            status = {contacts.status}
                            location = "Show Location"
                        />}
                        )}
            </tbody>
            
        </table>
    </div>
        
    );
  };

export default Contacts;