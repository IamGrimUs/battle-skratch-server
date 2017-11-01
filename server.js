const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./app/user/userRoutes');

const { PORT, DATABASE_URL } = require('./config');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use('/api/user', userRouter);

let server;

// app.get('/', (req, res) => {
//   res.status(200).sendFile(__dirname + '/public/index.html');
// });

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
