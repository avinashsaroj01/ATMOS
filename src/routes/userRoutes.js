const express = require('express');
const { register } = require('../controllers/usercontrollers');
const router = express.Router();
router.route('/register').post(register);

module.exports = router;