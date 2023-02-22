// Modules / Packages
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const session = require('express-session');
const cors = require('cors');
const corsOptions = require('./Config/corsOptions');
// const {v4: uuid } = require('uuid');
const verifyJWT = require('./Middlewares/verifyJWT');


// Middlewares
const app = express();
app.use(express.urlencoded({extended: false})); // built in middleware for handling form data
app.use(express.json()); // built in middleware to handle json
app.use(express.static(path.join(__dirname, '/Public'))); // built in middleware to handle static files such as css
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
app.use(verifyJWT);


//Database Connection Setup
// const CONNECTION_URL = process.env.DB;
const PORT = process.env.PORT || 5000;
// mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
//     .catch((error) => console.log(error.message));


app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
