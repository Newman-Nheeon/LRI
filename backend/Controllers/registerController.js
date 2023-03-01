const usersDB = {
    users: require('../Models/users.json'),
    setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const RegisterNewUsers = async (req, res) => {
    const {firstName, lastName, password, email } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({'message': 'Fields are required!!'});

    // Check for duplication
    const duplicate = usersDB.users.find(person => person.email === email);
    if (duplicate) return res.sendStatus(409);
    try {
        // encrypt the password using bcrypt
        const hashedPwd = await bcrypt.hash(password, 10);

        // store the new user
        const newUser = {
            "firstNme": firstName, 
            "lastName": lastName, 
            "email": email, 
            "roles": {"Mentee": 2001},
            "password": hashedPwd,
            
        };

        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'Model', 'users.json'), 
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `New User ${firstName} created`})
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
}

module.exports = { RegisterNewUsers };

