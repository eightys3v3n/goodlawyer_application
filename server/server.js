const crypto = require('crypto'),
      fs = require('fs'),
      https = require('https'),
      express = require('express'),
      express_session = require('express-session'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      path = require('path'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      routes = require('./routes/api'),
      user = require('./models/user');
require('dotenv').config();


// Setup MongoDB Connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB, { useNewUrlParser: true})
  .then(() => console.log("Database connected successfuly"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;


let privateKey = fs.readFileSync('../key.pem').toString();
let certificate = fs.readFileSync('../cert.pem').toString();
let opts = {
  key: privateKey,
  cert: certificate,
};

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session') ({
  secret: 'Secret text',
  resave: false,
  saveUninitialized: false
}))

// Logins
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserlializeUser(user.deserializeUser());


// ROUTES
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

const port = process.env.PORT || 3080;

let server = https.createServer(opts, app);
server.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});
