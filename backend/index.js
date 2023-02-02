const express = require('express');
const JWT = require('jsonwebtoken');

const app = express();
const PORT =5000;

app.use(express.json());


















app.listen(PORT,()=>console.log("Server is running at port "+PORT));