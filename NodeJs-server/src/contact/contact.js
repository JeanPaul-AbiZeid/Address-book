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

module.exports = {addContact};