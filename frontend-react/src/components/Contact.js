import React from "react";

const ContactRow = ({id, name, number, status, email, lat, long, onLocation, onDelete}) => {
  
  return (
    <tr id={id}>
        <td>{name}</td>
        <td>{number}</td>
        <td>{status}</td>
        <td>{email}</td>
        <td className="cursor" onClick={() => {
          onLocation(lat, long)
        }}>Show Location</td>
        <td className="cursor" onClick={() => {
            onDelete(id);
          }}>delete</td>
        <td>edit</td>
    </tr>
  );
};



export default ContactRow;