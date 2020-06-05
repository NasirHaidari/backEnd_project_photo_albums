/**
 * Album Routes
 */

const express = require('express');
const router = express.Router();
const { index, show, createAlbum, update, destroy, storePhotos } = require('./../controllers/album_controller');
const { AlbumCreateRules, storePhoteInAlbum } = require('../validation/validation');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:albumId', show);

/* Store photos on a specific album */
router.post('/:albumId/photos', storePhoteInAlbum, storePhotos);

/* Store a new album */
router.post('/', AlbumCreateRules, createAlbum);

/* Update a specific album */
router.put('/:albumId', update);

/* Destroy a specific album */
router.delete('/:albumId', destroy);

module.exports = router;