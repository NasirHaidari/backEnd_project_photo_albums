/**
 * Album Controller
 */

const { User, Album, Albums_Photos } = require('../models');
const { validationResult, matchedData } = require('express-validator');


const validateAlbum = async (id, user_id, res) => {
	try {
		const album = await Album.fetchAlbumId(id, { require: false });
		if (!album) {
			res.status(404).send({
				status: 'fail',
				data: "The requested album does not exist",
			});
			return;
		}

		const albumUser = await new Album({
			id, user_id,
		}).fetch({ withRelated: 'photos', require: false });

		if (!albumUser) {
			res.status(401).send({
				status: 'fail',
				data: "Not allowed",
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

const index = async (req, res) => {

	try {

		const user = await User.fetchUserId(req.user.data.id, { withRelated: 'albums' });
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


const show = async (req, res) => {

	try {
		const album = await validateAlbum(req.params.albumId, req.user.data.id).fetchAll();
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


const createAlbum = async (req, res) => {


	validateInput(req, res);

	const validData = matchedData(req);

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

	validData.user_id = req.user.id;

	try {

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

const storePhotos = async (req, res) => {


	validateInput(req, res);

	const validData = matchedData(req);


	const uniquePhotos = [...new Set(validData.photo_ids)];


	const album_id = Number(req.params.albumId);

	try {

		const album = await validateAlbum(req.params.albumId, req.user.id, res);
		if (!album) { return; };

		const photoIds = album.relations.photos.models.map(photo => photo.id);

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


	try {

		const user = await User.fetchUserId(req.user.id, { withRelated: 'photos' });
		const photos = user.related('photos');


		const photoArrayDb = photos.models.map(photo => photo.id);

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