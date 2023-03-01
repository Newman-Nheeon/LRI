const usersDB = {
    users: require('../Models/users.json'),
    setUsers: function (data) { this.users = data }
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const {firstName, lastName, password, email } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({'message': 'Fields are required!!'});

    const findUser = usersDB.users.find(person => person.email === email);
    if (!findUser) return res.sendStatus(401); //Unauthorized

    // Evaluate Password
    const match = await bcrypt.compare(password, findUser.password);
    if (match) {

        const roles = Object.values(findUser.roles);

        // create JWT's
        const accessToken = jwt.sign(
            {"UserInfo": {
                "email": findUser.email,
                "roles": roles
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '900s'}
        );
        const refreshToken = jwt.sign(
            {"email": findUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        ); 

        // Saving refreshToken with current user
        const otherUser = usersDB.users.filter(person => person.email !== findUser.email);
        const currentUser = {...findUser, refreshToken };
        usersDB.setUsers([...otherUser, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'Models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
    }else {
        res.sendStatus(401);
    }
}
module.exports = { handleLogin };