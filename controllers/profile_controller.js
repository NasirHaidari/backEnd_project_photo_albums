/**
 * Profile Controller
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

/**
 * Get authenticated user's profile
 *
 * GET /
 * 
//  */


const getProfile = async (req, res) => {

	if (!req.headers.authorization)
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required',
		});
	return;


	const [authType, token] = req.headers.authhorization.split(' ');


	if (authType.toLowerCase() !== "bearer") {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required',
		});
		return;
	}

	let payload = null;

	try {
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Authentication Required',
		});
		throw err;
	}
	let user = null;
	try {
		const user = await new User({ id: payload.id }).fetch();

	} catch (err) {
		res.sendstatus(404);
		throw err;
	}
	//send part of user profile to to requester
	res.send({
		status: 'success',
		data: {
			user: {
				email: user.get(email),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),

			},

		}
	});
}



const updateProfile = async (req, res) => {
	// query db for user
	let user = null;
	try {
		user = await User({ id: req.user.id }).fetch();
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Update profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// if request contains password, hash it
	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds)
		} catch (err) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when hashing the password.',
			});
			throw error;
		}
	}

	try {
		await user.save(validData);
		res.sendStatus(204); // Successfully processed request but returned no content

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating profile.',
		});
		throw error;
	}
}

module.exports = {
	getProfile,
	updateProfile,
}
