const usersDB = {
    users: require('../Models/users.json'),
    setUsers: function (data) { this.users = data }
};

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    console.log(cookies);
    if (!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const findUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!findUser) return res.sendStatus(403); // Forbidden

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || findUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(findUser.roles);
            const accessToken = jwt.sign(
                {"userInfo": {
                    "email": decoded.email,
                    "roles": roles
                }
            },

                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '900'}
            );
            res.join({ accessToken })
        }
    );   
}
module.exports = { handleRefreshToken };