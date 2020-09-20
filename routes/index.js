

const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
// const authController = require('../controllers/auth_controller')



router.get('/', (req, res) => {
	res.send({
		status: 'success'

	});

});

router.use('/register', require('./users'));

// router.use('/profile', [auth.basic], require('./profile'));

// router.post('/login', authController.login);

// router.post('/refresh', authController.refresh);

router.use('/photos', auth.basic, require('./photos'));

router.use('/albums', auth.basic, require('./albums'));


module.exports = router;
