/**
 * User Controller
 */

const bcrypt = require('bcrypt');
const { User } = require('../models');
const { validationResult, matchedData } = require('express-validator');


/*
* POST /
*/
const createUser = async (req, res) => {


	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req);

	try {

		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds);

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
	}

	try {

		const user = await User.forge(validData).save();

		res.send({
			status: 'success',
			data: {
				user,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Exception thrown in database when creating a new user',
		});
		throw error;
	}

}

const updateUser = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed',

	});
};

const deleteUser = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method not allowed',

	});
}



module.exports = {
	createUser,
	updateUser,
	deleteUser
}