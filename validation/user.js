


const { User } = require('../models');
const { body } = require('express-validator');



const userCreateRules = [

    body('email').isEmail().trim().isLength({ min: 6 }).custom(async value => {

        //if user exist..
        const email = await new User({ email: value }).fetch({ require: false });
        if (email) {
            return Promise.reject('Email already exists.');
        }
        return Promise.resolve();
    }),
    body('password').isString().trim().isLength({ min: 6 }),
    body('first_name').isString().trim().isLength({ min: 3 }),
    body('last_name').isString().trim().isLength({ min: 3 }),
];


module.exports = {
    userCreateRules
}
