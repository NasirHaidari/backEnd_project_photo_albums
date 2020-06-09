const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
const authController = require('../controllers/auth_controller')



router.get('/', (req, res) => {
	res.send({
		status: '_Welcome!_to login use /login To create signup use /register after the url ardress ',

	});

});

router.use('/register', require('./users'));


router.post('/login', authController.login);


router.post('/refresh', authController.refresh);


//
router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));


module.exports = router;
