const jwt = require('jsonwebtoken');
const { getTokenFromHeaders } = require('../auth_controller');
const { User } = require('../../models');





// const basic = async (req, res, next) => {

// 	if (!req.headers.authorization) {
// 		res.status(401).send({
// 			status: 'fail',
// 			data: 'Authorization required',
// 		});
// 		return;
// 	}
// 	const [authSchema, base64payload] = req.headers.authorization.split(' ');
// 	if (authSchema.toLowerCase() !== "basic") {

// 		next();
// 	}
// 	const decodedpayload = Buffer.from(base64payload, 'base64').toString('ascii');
// 	const [email, password] = decodedpayload.split(':');

// 	const user = await User.login(email, password);
// 	if (!user) {
// 		res.status(401).send({
// 			status: 'fail',
// 			data: 'authorization failed'
// 		})
// 		return;
// 	}


// 	req.user = user;

// 	next();
// }

//
const validateJwtToken = (req, res, next) => {
	const token = getTokenFromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: 'faild',
			data: 'No token found in header. (err.3)',
		});
		return;
	}


	let payload = null;

	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Authentication Required',
		});
		throw err;
	}

	//attach payload to req.user
	req.user = payload;

	next();

}



module.exports = {
	// basic,
	validateJwtToken
}





// const login = async (req, res) => {
// 	const user = await User.login(req.body.email, req.body.password);
// 	if (!user) {
// 		res.status(401).send({
// 			status: "fail",
// 			data: "Authentication required.",
// 		});
// 		return;
// 	}












