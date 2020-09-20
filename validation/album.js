///Album



const { body } = require('express-validator');


const storePhotoInAlbum = [
    body('title').isString().trim().isLength({ min: 3 })

];

const AlbumCreateRules = [
    body('title').isString().trim().isLength({ min: 2 })
];



module.exports = {

    AlbumCreateRules,
    storePhotoInAlbum
}