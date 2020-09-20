const bcrypt = require("bcrypt");
const { User } = require("../../models");




const basic = async (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(401).send({
			status: "fail",
			data: "Authorization required"
		});
		return;
	}


	const [authSchema, base64payload] = req.headers.authorization.split(" ");
	if (authSchema.toLowerCase() !== "basic") {
		next();
	}

	const decodedpayload = Buffer.from(base64payload, "base64").toString("ascii");

	const [username, password] = decodedpayload.split(":");

	const user = await User.login(username, password);
	if (!user) {
		res.status(401).send({
			status: "fail",
			data: "authorization failed"
		});
		return;
	}

	req.user = user;
	next();

}


module.exports = {
	basic
	// validateJwtToken
}







