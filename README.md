# A basic login page for a job application

This is a basic login page written utilizing NodeJS {Express,Mongoose,passport,body-parser,and others} and MongoDB.  

## To Run
- Clone.
- Move react_app/.env.example to react_app/.env and remove the instructions in the top of the file.
- Get an HTTPS certificate.pem and its key.pem and place them at at project_root/cert.pem and project_root/key.pem.

### MongoDB
Put up MongoDB and change the URL in .env accordingly.  
Currently the project is configured to connect without credentials so make sure MongoDB allows authentication bypass from localhost.

### Node Server
- From inside react_app do `npm install .` and `node_modules/.bin/nodemon server.js`.
- Optionally open port 3080

### React Website
- Change the API server url in both components/Login/Login.js and components/Register/Register.js. While I would like to put them in the .env file I couldn't get it figured out.
- From inside react_app do `npm install .`

#### Development Build
- `HTTPS=true npm start`
- Optionally open port 3000

#### Production Build
- `npm run build`
- `npm install serve`
- `node_modules/.bin/serve -s build --listen 5000 --ssl-cert your_cert.pem --ssl-key your_key.pem`
- Optionally open port 5000
