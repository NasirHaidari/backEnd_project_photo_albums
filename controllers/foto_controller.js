/**
 * FotoController
 */

const models = require('../models');

/**
 * Get all foto
 *
 * GET /
 */
const index = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.' });
}

/**
 * Get a foto *
 * GET /:fotoId
 */
const show = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.' });
}

/**
 * Create a new foto *
 * POST /
 */
const store = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.' });
}

/**
 * Update a foto *
 * PUT /:fotoId
 */
const update = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.' });
}

/**
 * Delete a foto *
 * DELETE /:fotoId
 */
const destroy = async (req, res) => {
	res.status(405).send({ status: 'fail', message: 'Method Not Implemented.' });
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
