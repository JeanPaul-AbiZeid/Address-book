const Contact = require('../../model/Contact');

async function add(body) {
    const {
      name,
      number,
      status,
      email,
      lat,
      long,
      user_id,
    } = body;
  
    const contact = new Contact({
      name,
      number,
      status,
      email,
      lat,
      long,
      user_id,
    });
  
    return await contact.save();
}

async function addContact(req, res) {
    try {
      console.log(req.body);

      const newContact = await add(req.body);
      console.log('newContact =>', newContact);
      
  
      return res.status(200).send(newContact);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
}

async function deleteContact(req, res) {
    try {
      const contact = await Contact.findOne({ _id: req.query.id });
  
      const deleteResult = await contact.remove();
  
      return res.send("Contact deleted");
    } catch (error) {
      console.log(error);
    }
}

async function get(id) {
    return await Contact.find({ "user_id" : id });
}

async function getContacts(req, res) {
    try {
      console.log(req.query);
  
      const result = await get(req.query.user_id);
      console.log('result =>', result);
  
      return res.send(result);
    } catch (error) {
      console.log(error);
    }
}

module.exports = {addContact, deleteContact, getContacts};