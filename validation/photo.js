


const { body } = require('express-validator');



const photoCreateRules = [
    body('title').isString().trim().isLength({ min: 3 }),
    body('url').isString().trim().isLength({ min: 7 }),
    body('comment').isString().trim().optional().isLength({ min: 3 }),
];





module.exports = {

    photoCreateRules,

}
