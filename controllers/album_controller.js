/**
 * Album Controller
 */


const { User, Album, Albums_Photos } = require('../models');
const { validationResult, matchedData } = require('express-validator');

// Function to validate that the photo exists and that it belongs to the user
const validateAlbum = async (id, user_id, res) => {

	try {
		// fetch the requested album from the database
		const album = await Album.fetchAlbumId(id, { require: false });

		// check if it exists, if not bail
		if (!album) {
			res.status(404).send({
				status: 'fail',
				data: "The requested album does not exist",
			});
			return;
		}

		// fetch the requested album from the user's database
		const albumUser = await new Album({
			id,
			user_id,
		}).fetch({ withRelated: 'photos', require: false });

		// check if the user owns this album, if not bail
		if (!albumUser) {
			res.status(401).send({
				status: 'fail',
				data: "You don't have access to this album",
			});
			return;
		}

		return albumUser;


	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photos",
		});
		throw error;
	}

}

// Function to check that all data passed the validation rules
const validateInput = (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}
	return;
}

/**
 * Get all albums
 *
 * GET /
 */
const index = async (req, res) => {

	try {
		// fetch all albums belonging to the user from the database
		const user = await User.fetchUserId(req.user.id, { withRelated: 'albums' });
		const albums = user.related('albums');

		res.send({
			status: 'success',
			data: {
				albums
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested albums",
		});
		throw error;
	}

}

/**
 * Get a specific album
 *
 * GET /:albumId
 */
const show = async (req, res) => {

	try {
		// Validate that everything is fine with the album that the user wants to get
		const album = await validateAlbum(req.params.albumId, req.user.id, res);
		if (!album) { return; };


		res.send({
			status: 'success',
			data: {
				album
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested album!!!!!",
		});
		throw error;
	}
}

/**
 * Store a new album
 *
 * POST /
 */
const createAlbum = async (req, res) => {

	// check that all data passed the validation rules
	validateInput(req, res);

	// get the valid input data
	const validData = matchedData(req);

	// check if album title already exists in user's database
	try {
		const album = await new Album({ title: validData.title, user_id: req.user.id }).fetch({ require: false });
		if (album) {
			res.status(409).send({
				status: 'fail',
				data: 'album exists.'
			});
			return;
		}

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested album",
		});
		throw error;
	}

	// attach the user's id to the input data
	validData.user_id = req.user.id;

	try {
		// store the album in the db
		const album = await Album.forge(validData).save();

		res.send({
			status: 'success',
			data: {
				album,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Error when creating a new album',
		})
		throw error;
	}
}

/**
 * Store user's photos in a specific album
 *
 * POST /
 */
const storePhotos = async (req, res) => {

	// check that all data passed the validation rules
	validateInput(req, res);

	// extract the valid data
	const validData = matchedData(req);

	// Make sure there are no duplicates of photo id:s sent from the user
	const uniquePhotos = [...new Set(validData.photo_ids)];

	// get the album id
	const album_id = Number(req.params.albumId);

	try {
		// validate that everything is fine with the album that the user wants to add photos to
		const album = await validateAlbum(req.params.albumId, req.user.id, res);
		if (!album) { return; };

		// Make sure that any of the photos doesn't already exist in the album

		// extract the photo ids from the album
		const photoIds = album.relations.photos.models.map(photo => photo.id);

		// check if any of the photos that the user is trying to store in the album already exists in the album 
		// if so bail and let the user know which photos are duplicates
		const duplicates = photoIds.filter(id => uniquePhotos.indexOf(id) != -1);

		if (duplicates.length !== 0) {
			res.status(409).send({
				status: 'fail',
				data: `Photo with id ${duplicates} already exists in this album. Please remove those id:s and try again`,
			});
			return;
		}

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested album",
		});
		throw error;
	}

	// Make sure the owner owns the photos 
	try {
		// get all the photos that the user owns from the db
		const user = await User.fetchUserId(req.user.id, { withRelated: 'photos' });
		const photos = user.related('photos');

		// extract only the id:s of the photos that the user owns
		const photoArrayDb = photos.models.map(photo => photo.id);

		// check if the owners owns the photos, otherwise bail
		const difference = uniquePhotos.filter(id => !photoArrayDb.includes(id));

		if (difference.length !== 0) {
			res.status(401).send({
				status: 'fail',
				data: `You don't have access to photo with id: ${difference}`,
			});
			return;
		}

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
		throw error;
	}


	try {

		const new_photos = uniquePhotos.map(photo_id => {
			return {
				album_id,
				photo_id
			}
		});

		const data = await Promise.all(new_photos.map(async photo => {
			return await Albums_Photos.forge(photo).save();
		}));

		res.send({
			status: 'success',
			data: {
				data
			}
		});

	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Error when storing photos in this album',
		})
		throw error;
	}

}


const update = (req, res) => {

	res.status(405).send({
		status: 'fail',
		message: 'Method no allowed',

	});
}


const destroy = async (req, res) => {

	res.status(405).send({
		status: 'fail',
		message: 'Method no allowed',

	});
}

module.exports = {
	index,
	show,
	createAlbum,
	storePhotos,
	update,
	destroy,
} 