const express = require('express');
const router = express.Router();
const Login = require('../models/user');

router.post('/login', (req, res, next) => {
  console.log(req.body);
  res.send({
    status: 'Failed to login with '+req.username+' because its not implemented!',
    success: false,
    token: null,
  })
  next();
});

module.exports = router;
