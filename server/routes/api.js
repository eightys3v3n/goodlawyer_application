const express = require('express');
const router = express.Router();
const Login = require('../models/login');

router.get('/login', (req, res, next) => {
    Login.find({}, 'username')
        .then(data => res.json(data))
        .catch(next)
});

module.exports = router;
