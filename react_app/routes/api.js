const express = require('express');
const router = express.Router();
const User = require('../models/user');


async function login(username, password) {
  const attempt = await User.authenticate()(username, password);
  return attempt;
}


router.get('/login', (req, res, next) => {
  res.send({
    method: "POST",
    data: {
      username: "username to login with",
      password: "password to login with",
    }
  })
});

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


async function register(username, password) {
  const new_user = new User({username: username});
  await new_user.setPassword(password);
  await new_user.save();
  return new_user;
}


router.get('/register', (req, res, next) => {
  res.send({
    method: "POST",
    data: {
      username: "username to register with",
      password: "password to register with",
    }
  })
});


router.post('/register', (req, res, next) => {
  register(req.body.username, req.body.password)
    .then(registerRes => {
      console.log("Registered new user '"+registerRes.username);
      // if (registerRes.user) {
      //   res.send({
      //     status: "Registered",
      //     success: true,
      //   });
      // } else {
      //   res.send({
      //     status: registerRes.error.message,
      //     success: false,
      //   });
      // }
      next();
    });
});


module.exports = router;
