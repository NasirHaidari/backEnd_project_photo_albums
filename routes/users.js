/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser } = require('./../controllers/user_controller');
const { userCreateRules } = require('../validation/validation');


//create a User

router.post('/', userCreateRules, createUser);

router.put('/', updateUser);
router.delete('/', deleteUser);
module.exports = router;
