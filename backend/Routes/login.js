const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/loginController');


router.post('/', loginController.handleLogin);

module.exports = router;