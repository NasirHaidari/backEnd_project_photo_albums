/**
 * Album Controller
 */

const { User, Album, Albums_Photos } = require('../models');
const { validationResult, matchedData } = require('express-validator');
const models = require("../models");


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
			message: "Error (1) when finding the requested photos",
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
//// Fetch All Albums
const index = async (req, res) => {


	try {
		const user = await new models.User({ id: req.user.id }).fetch({
			withRelated: "albums"
		});

		// const albums = await models.Album.fetchAll();
		const albums = user.related("albums");
		console.log(albums);

		res.send({ status: "success", data: { albums } });
	} catch (err) {
		res.status(404).send({
			status: "fail",
			data: "user not available"
		});
	}
};




const show = async (req, res) => {
	
	try {
		const album = await new models.Album({
			id: req.params.albumId,
			user_id: req.user.id
		}).fetch({ withRelated: ["photos"] });
		res.send({ status: "success", data: { album } });
	} catch (err) {
		res.status(404).send({
			status: "fail",
			data: "not available"
		});
	}
};







const createAlbum = async (req, res) => {
	console.log(req.user.id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create album request failed validation:", errors.array());
		res.status(422).send({
			status: "fail",
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req);
	validData.user_id = req.user.id;

	try {
		const album = await new Album(validData).save();
		console.log("new album created:", album);
		res.send({
			status: "success",
			data: {
				album
			}
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when creating a new album"
		});
		throw errors;
	}
};







const storePhotos = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		res.status(422).send({
			status: "fail",
			data: error.array()
		});
		return;
	}

	try {
		const photo = await Photo.fetchById(req.body.photo_id);
		const album = await Album.fetchById(req.params.albumId);
		const photoToAlbum = await album.photos().attach([photo]);

		res.status(201).send({
			status: "success",
			data: photoToAlbum
		});
	} catch (err) {
		res.status(500).send({
			status: "error",
			message: "error when trying to add photo to album"
		});
		throw error;
	}
};


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