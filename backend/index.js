// Modules / Packages
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require('./Config/dbCon');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const corsOptions = require('./Config/corsOptions');
const verifyJWT = require('./Middlewares/verifyJWT');
const credentials = require('./Middlewares/credentials');


// Middlewares
const app = express();
app.use(express.urlencoded({extended: false})); // built in middleware for handling form data
app.use(express.json()); // built in middleware to handle json
app.use(express.static(path.join(__dirname, '/Public'))); // built in middleware to handle static files such as css
app.use(credentials); // handle options credentials check - before CORS and fetch cookies credentials requirements
app.use(cors(corsOptions)); // Cross Origin Resource Sharing
app.use(cookieParser()); // Middleware for cookies



// Routes
app.get('/', (req, res)=>{
    res.send("Server Running");
});

app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'))
});

app.use('/register', require('./Routes/Register'));
app.use('/login', require('./Routes/login'));
app.use('/refresh', require('./Routes/refresh'));
app.use('/logout', require('./Routes/logout'));
app.use(verifyJWT);


// Database Connection to MongoDB
connectDB();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
})


