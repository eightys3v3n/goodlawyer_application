const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();


// Sanitize the inputs then attempt to login
async function login(username, password) {
  username = sanitize(username);
  password = sanitize(password);
  const attempt = await User.authenticate()(username, password);
  return attempt;
}


// Sanitize the inputs then attempt to register a new user.
async function register(username, password) {
  username = sanitize(username);
  password = sanitize(password);
  let res = {
    username: username
  };

  if (password.length < process.env.PW_LENGTH) {
    console.warn("Not enforcing longer than "+
                 process.env.PW_LENGTH+
                 " character passwords for ease of testing");
  }

  if (username.length < process.env.USER_LENGTH) {
    console.warn("Not enforcing longer than "+
                 process.env.USER_LENGTH+
                 " character usernames for ease of testing");
  }


  let existingUsers = await User.findOne({username: username}).exec();
  if (existingUsers == null) {
    let user = new User({username: username});
    await user.setPassword(password);
    await user.save();
    res = {
      ...res,
      success: true,
      status: "Registered successfully"
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


// /login api
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


// /register api
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
