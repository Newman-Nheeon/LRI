const User = require('../Models/users');
const bcrypt = require('bcrypt');

const RegisterNewUsers = async (req, res) => {
    const {firstName, lastName, password, email } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({'message': 'Fields are required!!'});

    // Check for duplication
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409);
    try {
        // encrypt the password using bcrypt
        const hashedPwd = await bcrypt.hash(password, 10);

        // create and store the new user
        const newUser = await User.create({
            "firstName": firstName, 
            "lastName": lastName, 
            "email": email, 
            "password": hashedPwd,
            
        });

        console.log(newUser);

        res.status(201).json({'success': `New User ${firstName} created`})
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
}

module.exports = { RegisterNewUsers };