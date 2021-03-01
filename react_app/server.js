const crypto = require('crypto'),
      fs = require('fs'),
      https = require('https'),
      express = require('express'),
      expressSession = require('express-session')({
        secret: 'secret_Stuff_here', // is okay because I never implemented server side tracking of logged in clients.
        resave: false,
        saveUninitialized: false
      }),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      path = require('path'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      cors = require('cors'),
      routes = require('./routes/api'),
      User = require('./models/user');
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


// Prepare encryption (HTTPS) by reading in certificates
let privateKey = fs.readFileSync('../key.pem').toString();
let certificate = fs.readFileSync('../cert.pem').toString();
let opts = {
  key: privateKey,
  cert: certificate,
};


// Create the listening app.
const app = express();
const port = process.env.PORT || 3080;
app.use(bodyParser.json());


// CORS for API accessing
app.use(cors());
let whitelist = ['https://localhost:3000', 'https://localhost:3080'];
let corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


// For logins and registrations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});


// Start the server
let server = https.createServer(opts, app);
server.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});
