import React, {useState, useEffect} from "react";
import '../App.css';
import { useParams, useNavigate } from "react-router-dom";
import Contact from "./Contact";
import axios from 'axios';
import Map from "./Map";
import { FaWindowClose } from "react-icons/fa";


const Contacts = () => {
    const Navigation = useNavigate();
    const {id} = useParams()
    const [contacts, setContacts] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [lat, setLat] = useState("33.896694");
    const [long, setLong] = useState("35.541887");
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState(null);


    const handleClick = event => {
        //  toggle isActive state on click
        setIsActive(current => !current);
    };

    function Location(lat, long){
        setShow(current => !current);
        setLat(lat);
        setLong(long);
    };

    window.dispatchEvent(new Event('resize'))

    useEffect(() => {
    //Accepts a function to perform on certain changes
    const getContacts = async () => {
        const Contacts = await fetchContacts();
        setContacts(Contacts);
    };
    getContacts();
    }, []);

    const handleSearch = (event) => {
        const resultFromSearch = contacts.filter((contact) =>
            contact.name.includes(event.target.value) || contact.number.includes(event.target.value));
        setSearch(resultFromSearch);
        if(event.target.value === ""){
            setSearch(null)
        }
    };
    
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

        setContacts(contacts.filter((contact) => contact._id !== contact_id));
        if(search){
            setSearch(search.filter((contact) => contact._id !== contact_id));
        }
    };


    return (
        <div>
            <nav className="top-nav">
                <h1>Address Book</h1>
                <ul className="links">
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>
                    <button className="btn-white" onClick={
                        function logout(){
                            localStorage.clear();
                            Navigation("/")
                        }
                    }>Log Out</button>
                </li>
                </ul>
            </nav>
            <div className="contacts">
                <button className={!isActive ? "show add" : "hide"}
                onClick={function toggle(){
                    handleClick();}}>Add Contact</button>
                <form className={isActive ? "show form" : "hide"}>
                    <span className="close" onClick={
                        function Create(e){
                        e.preventDefault();
                        handleClick();}}>x</span>
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
                                setContacts([...contacts, response.data])
                            })
                            .catch(function (error){
                                console.log(error)
                                alert(error)
                            })
                        }
                        }
                        >Create</button>
                    </div>
                    
                </form>

                <label htmlFor="search">Search:<input id="search" type="text" onChange={handleSearch} /></label>
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
                            : !search ? contacts.map((contacts, index) => {
                                return  <Contact
                                    key = {index}
                                    id = {contacts._id}
                                    name = {contacts.name}
                                    number = {contacts.number}
                                    email = {contacts.email}
                                    status = {contacts.status}
                                    lat = {contacts.lat}
                                    long = {contacts.long}
                                    onLocation = {Location}
                                    onDelete = {deleteContact}
                                />}) : search.map((contacts, index) => {
                                    return  <Contact
                                        key = {index}
                                        id = {contacts._id}
                                        name = {contacts.name}
                                        number = {contacts.number}
                                        email = {contacts.email}
                                        status = {contacts.status}
                                        lat = {contacts.lat}
                                        long = {contacts.long}
                                        onLocation = {Location}
                                        onDelete = {deleteContact}
                                />
                                })}
                    </tbody>
                </table>

                <div className={show ? "map" : "no_map"}>
                    <FaWindowClose className="close close-map" onClick={() => {setShow(current => !current)}}/>
                    <Map lat={lat} long={long}/> 
                </div>
                
            </div>
        </div>
        
    );
  };

export default Contacts;