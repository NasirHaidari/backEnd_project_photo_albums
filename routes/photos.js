



////Photo Rules

const express = require('express');
const router = express.Router();
const { index, show, createPhoto, update, destroy } = require('../controllers/photo_controller');
const { photoCreateRules } = require('../validation/photo');


router.get('/', index);


router.get('/:photoId', show);


router.post('/', photoCreateRules, createPhoto);


router.put('/:photoId', update);


router.delete('/:photoId', destroy);

module.exports = router;