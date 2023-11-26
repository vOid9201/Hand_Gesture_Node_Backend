const User = require("../database/user");
const hashPassword = require("../utils/hashPassword");

const userSignUp = async (req, res, next) => {
	try {

		const user = req.body;
		user.password = await hashPassword(user.password);

		const newUser = new User(req.body);
		await newUser.save();
		res.send(newUser)
	}
	catch (err) {
		next(err)
	}
}

module.exports = userSignUp;