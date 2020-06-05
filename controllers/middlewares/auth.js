

const { User } = require('../../models')
const jwt = require('jsonwebtoken');
const { getTokenFromHeaders } = require('../auth_controller')


const validateJwtToken = async (req, res, next) => {
	const token = getTokenFromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: 'fail',
			data: 'No token found in request headers.',
		});
		return;
	}


	const [authSchema, base64Payload] = req.headers.authorization.split(' ');

	if (authSchema.toLowerCase() !== "basic") {
		// not ours to authenticate
		next();
	}



	// Validate token and extract payload
	let payload = null;
	try {

		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	}
	catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Authentication Failed.',
		});
		throw err;
	}

	// attach payload to req.user
	req.user = payload;

	next();
}

const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);
	if (!user) {
		res.status(401).send({
			status: "fail",
			data: "Authentication required.",
		});
		return;
	}
	// Construct JWT payload
	const payload = {
		data: {
			id: user.get('id'),
			email: user.get('email'),
		}
	};

	// Sign payload and get access token
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1h" });

	// Sign payload and get refresh token
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d" });


	res.send({
		status: "success",
		data: {
			accessToken,
			refreshToken,
		},
	});
}



const refresh = (req, res) => {
	const token = getTokenfromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: "fail",
			data: "No token found in request headers.",
		});
		return;
	}

	try {
		// Verify token using the refresh token secret
		const { data } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

		// Construct new payload
		const payload = {
			data,

		}



		// Issue a new token using the access token secret

		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1h" });



		res.send({

			status: "success",

			data: {

				access_token,

			},

		});



	} catch {

		res.status(403).send({

			status: "fail",

			data: "Invalid token.",

		});

		return;

	}

}






// var decoded = jwt.decode(token);

// // get the decoded payload and header
// var decoded = jwt.decode(token, { complete: true });
// console.log(decoded.header);
// console.log(decoded.payload)


module.exports = {
	validateJwtToken,
	login,
	refresh
}
