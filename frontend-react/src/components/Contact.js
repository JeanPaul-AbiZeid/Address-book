import React from "react";

const ContactRow = ({id, name, number, status, email, location, onDelete}) => {
  
  return (
    <tr id={id}>
        <td>{name}</td>
        <td>{number}</td>
        <td>{status}</td>
        <td>{email}</td>
        <td className="cursor">{location}</td>
        <td className="cursor" onClick={() => {
            onDelete(id);
          }}>delete</td>
        <td>edit</td>
    </tr>
  );
};



export default ContactRow;