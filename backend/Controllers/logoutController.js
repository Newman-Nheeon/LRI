const usersDB = {
    users: require('../Models/users.json'),
    setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // Code Here >> on client, also delete accessToken



    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;

    // Is refresh token in DB
    const findUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!findUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(203);
    }
    // delete refreshToken from DB
    const OtherUser = usersDB.users.filter(person => person.refreshToken !== findUser.refreshToken);
    const currentUser = {...findUser, refreshToken: ' '};
    usersDB.setUsers([...OtherUser, currentUser]);
     
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'Models', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.sendStatus(204);
    
}
module.exports = { handleLogout };