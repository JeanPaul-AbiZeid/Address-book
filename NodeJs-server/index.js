require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// console.log("test")
const DB_CONNECT = process.env.DB_CONNECT || "";
mongoose.connect(
  DB_CONNECT,
  () => console.log('connected to db')
);


const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log('Server running'));