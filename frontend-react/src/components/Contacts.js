import React, {useState, useEffect} from "react";
import '../App.css';
import { Link, useNavigate, useParams } from "react-router-dom";

const Surveys = () => {
    const {id} = useParams()
    const Navigation = useNavigate();
    const [contacts, setContacts] = useState([]);
    
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
    <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Status</th>
                <th>Email</th>
                <th>Location</th>
            </tr>
            
        </table>
    </div>
        
    );
  };

export default Surveys;