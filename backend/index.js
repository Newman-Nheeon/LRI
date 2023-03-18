// Modules / Packages
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');

// Imports
const registerRouter = require('./routes/register');
const connectDB = require('./Config/dbCon');
const corsOptions = require('./Config/corsOptions');
const credentials = require('./Middlewares/credentials');
const verifyJWT = require('./Middlewares/verifyJWT');
const PORT = process.env.PORT || 5000;


const app = express();

// Built-in middlewares
app.use(express.urlencoded({extended: false})); // For handling form data
app.use(express.json()); // For handling JSON data
app.use(express.static(path.join(__dirname, '/Public'))); // For serving static files like CSS

// Custom middlewares
app.use(credentials); // To handle options credentials check - before CORS and fetch cookies credentials requirements
app.use(cors(corsOptions)); // For enabling Cross-Origin Resource Sharing
app.use(cookieParser()); // For handling cookies


// Routes
app.get('/', (req, res)=>{
    res.send("Server Running");
});

// app.use('*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'))
// });

app.use('/register', registerRouter);
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);


// Database Connection to MongoDB
connectDB();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
})


