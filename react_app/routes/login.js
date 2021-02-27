const express = require('express');
const router = express.Router();
const user = require('../models/user');


async function login(username, password) {
  const attempt = await user.authenticate()(username, password);
  return attempt;
}


router.post('/login', (req, res, next) => {
  login(req.body.username, req.body.password)
    .then(loginRes => {
      if (loginRes.user) {
        res.send({
          status: "Logged in",
          success: true,
          token: "something",
        });
      } else {
        res.send({
          status: loginRes.error.message,
          success: false,
          token: null,
        });
      }
      next();
    });
});

module.exports = router;
