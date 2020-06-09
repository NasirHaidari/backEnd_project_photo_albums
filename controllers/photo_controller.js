/**
 * Photo Controller
 */

const { User, Photo } = require('../models');
const { validationResult, matchedData } = require('express-validator');


const validatePhoto = async (id, user_id, res) => {

	try {

		const photo = await Photo.fetchPhotoId(id, { require: false });


		if (!photo) {
			res.status(404).send({
				status: 'fail',
				data: "The requested photo does not exist",
			});
			return;
		}

		// fetch req. photo 
		const photoUser = await new Photo({
			id,
			user_id
		}).fetch({ withRelated: 'albums', require: false });


		if (!photoUser) {
			res.status(401).send({
				status: 'fail',
				data: "You don't have access to this photo",
			});
			return;
		}

		return photoUser;

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photos",
		});
		throw error;
	}

}

/**
 * Get all photos
 *
 * GET /
 */
const index = async (req, res) => {

	try {

		const user = await User.fetchUserId(req.data.user.id, { withRelated: 'photos' });
		const photos = user.related('photos');

		res.send({
			status: 'success',
			data: {
				photos
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photos",
		});
		throw error;
	}

}

/**
 * Get a specific photo
 *
 * GET /:photoId
 */
const show = async (req, res) => {

	try {
		// Validate that everything is fine with the photo that the user wants to get
		const photo = await validatePhoto(req.params.photoId, req.user.id, res);

		if (!photo) { return; };

		// if it belongs to the user, display it and its related albums
		res.send({
			status: 'success',
			data: {
				photo
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
		throw error;
	}

}

//create photo
const createPhoto = async (req, res) => {


	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	// get the valid input data
	const validData = matchedData(req);

	// check if photo title already exists in user's database
	try {
		const photo = await new Photo({ title: validData.title, user_id: req.user.id }).fetch({ require: false });
		if (photo) {
			res.status(409).send({
				status: 'fail',
				data: 'Photo title already exists. Please choose another title.'
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

	validData.user_id = req.user.id;
	//save photo
	try {

		const photo = await Photo.forge(validData).save();

		res.send({
			status: 'success',
			data: {
				photo,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Error when creating a new photo',
		})
		throw error;
	}
}



const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed',

	});
}



const destroy = async (req, res) => {

	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed',

	});
}

module.exports = {
	index,
	show,
	createPhoto,
	update,
	destroy,
}