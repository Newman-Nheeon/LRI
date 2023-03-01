const express = require('express');
const router = express.Router();
const logoutController = require('../Controllers/logoutController');


router.get('/', logoutController.handleLogout);

module.exports = router;