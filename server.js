const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const userRouter = require('./app/user/userRoutes');
const videoRouter = require('./app/video/videoRoutes');
const battleRouter = require('./app/battle/battleRoutes');
const authRouter = require('./app/auth/authRoutes');

const { PORT, DATABASE_URL } = require('./config');
const { jwtStrategy } = require('./app/auth/authStrategies');

const app = express();

mongoose.Promise = global.Promise;

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.static('public'));
app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/api/battle', battleRouter);
app.use('/api/video', videoRouter);
app.use('/api/user', userRouter);
app.use('/auth', authRouter);

let server;
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  let promise = new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`The server is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
  return promise;
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    let promise = new Promise((resolve, reject) => {
      console.log('Closing server...');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    return promise;
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
