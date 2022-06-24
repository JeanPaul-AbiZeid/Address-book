const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function addUser(body, hashPassword) {
    const {
      name,
      email,
    } = body;
  
    const user = new User({
      name,
      email,
      password: hashPassword
    });
  
    return await user.save();
  }

async function register(req, res) {
try {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const addUserResult = await addUser(req.body, hashPassword);
    console.log('addUserResult =>', addUserResult);
    
    return res.send({ user: addUserResult._id });
} catch (error) {
    console.log(error);
}
}

module.exports = {register};