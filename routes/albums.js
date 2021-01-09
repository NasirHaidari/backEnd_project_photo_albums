////Album Route

const express = require('express')
const router = express.Router()
const {
  index,
  show,
  createAlbum,
  update,
  destroy,
  storePhotos,
} = require('./../controllers/album_controller')
const { AlbumCreateRules, storePhotoInAlbum } = require('../validation/album')

////All Albums
router.get('/', index)

///Specific
router.get('/:albumId', show)

///Store photos in album
router.post('/:albumId/photos', storePhotoInAlbum, storePhotos)

///Store a album
router.post('/', AlbumCreateRules, createAlbum)

///Update album
router.put('/:albumId', update)

/// Destroy a album
router.delete('/:albumId', destroy)

module.exports = router
