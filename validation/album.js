///Album

const { body } = require('express-validator')
const models = require('../models')

const storePhotoInAlbum = [
  body('photo_id').custom((id) => {
    return models.Photo.fetchById(id)
  }),
]

const AlbumCreateRules = [body('title').isString().trim().isLength({ min: 2 })]

module.exports = {
  AlbumCreateRules,
  storePhotoInAlbum,
}
