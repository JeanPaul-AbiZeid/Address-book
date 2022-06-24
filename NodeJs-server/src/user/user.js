const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

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

async function getByEmail(email) {
    return await User.findOne({
      email
    });
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

async function login(req, res) {
    try {
      const user = await getByEmail(req.body.email);
      if (!user) return res.status(400).send('invalid credentials');
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send('invalid credentials');
  
      const token = jwt.sign(
        {_id: user._id, name: user.name, email: user.email},
        TOKEN_SECRET
      );
  
      return res.header('auth-token', token).send(token).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
}

module.exports = {register, login};