/**
 * Fotoroutes
 */

const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/foto_controller');

/* Get all foto */
router.get('/', fotoController.index);

/* Get a foto*/
router.get('/:fotoId', fotoController.show);

/* Create a new foto*/
router.post('/', fotoController.store);

/* Update a foto*/
router.put('/:fotoId', fotoController.update);

/* Delete a foto*/
router.delete('/:fotoId', fotoController.destroy);

module.exports = router;
