const User = require('../Models/users');
const handleLogout = async (req, res) => {
    // Code Here >> on client, also delete accessToken



    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;

    // Is refresh token in DB
    const findUser = await User.findOne({ refreshToken }).exec();
    if (!findUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(203);
    }
    // delete refreshToken from DB
    findUser.refreshToken = '';
    const result = await findUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.sendStatus(204);
    
}
module.exports = { handleLogout };