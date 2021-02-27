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
  let res = {
    username: username
  };

  let existingUsers = await User.findOne({username: username}).exec();
  if (existingUsers == null) {
    res = {
      ...res,
      success: true,
      status: "Registered"
    }
  } else {
    res = {
      ...res,
      success: false,
      status: "Username already exists"
    }
  }

  return res;
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
      console.log(registerRes);

      if (registerRes.success) {
        console.log("Registered new user '"+
                    registerRes.username+
                    "'");
      } else {
        console.log("Failed to register new user '"+
                    registerRes.username+
                    "' because "+
                    registerRes.status);
      }
      res.send(registerRes);
      next();
    });
});


module.exports = router;
