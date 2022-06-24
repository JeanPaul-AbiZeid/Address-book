const { Router } = require('express');
const {register, login} = require('./user');
const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

module.exports = router;