const usersDB = {
    users: require('../Models/users.json'),
    setUsers: function (data) { this.users = data }
};
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {firstName, lastName, password, email } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({'message': 'Fields are required!!'});

    const findUser = usersDB.users.find(person => person.email === email);
    if (!findUser) return res.sendStatus(401); //Unauthorized

    // Evaluate Password
    const match = await bcrypt.compare(password, findUser.password);
    if (match) {
        res.json({'success': `User ${firstName} is logged in`});
    }else {
        res.sendStatus(401);
    }
}
module.exports = { handleLogin };