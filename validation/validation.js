/**
 * Users
 */

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

//Photo 

const photoCreateRules = [
    body('title').isString().trim().isLength({ min: 3 }),
    body('url').isString().trim().isLength({ min: 7 }),
    body('comment').isString().trim().optional().isLength({ min: 3 }),
];


//Albums


const storePhoteInAlbum = [
    body('title').isString().trim().isLength({ min: 3 })

];

const AlbumCreateRules = [
    body('title').isString().trim().isLength({ min: 2 })
];



module.exports = {
    userCreateRules,
    photoCreateRules,
    AlbumCreateRules,
    storePhoteInAlbum
}

