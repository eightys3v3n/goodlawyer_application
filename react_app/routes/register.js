const express = require('express');
const router = express.Router();
const User = require('../models/user');


async function register(username, password) {
  const new_user = new User({username: username});
  await new_user.setPassword(password);
  await new_user.save();
}


router.post('/register', (req, res, next) => {
  register(req.body.username, req.body.password)
    .then(registerRes => {
      if (registerRes.user) {
        res.send({
          status: "Registered",
          success: true,
        });
      } else {
        res.send({
          status: registerRes.error.message,
          success: false,
        });
      }
      next();
    });
});

module.exports = router;
