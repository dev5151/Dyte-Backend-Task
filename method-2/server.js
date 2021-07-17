require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../method-2/network/routes/routes');
 
const app = express();

const mongodb_conn = process.env.DB_URL

mongoose
 .connect(mongodb_conn,{useNewUrlParser: true})
 .then(() => {
  console.log('Connected to the Database successfully');
 });
 
const PORT = process.env.PORT || 3000;
app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})