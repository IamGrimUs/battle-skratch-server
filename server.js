const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./app/user/userRoutes');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/user', userRouter);

// app.get('/', (req, res) => {
//   res.status(200).sendFile(__dirname + '/public/index.html');
// });

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.createConnection(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app
        .listen(port, () => {
          console.log(
            'time --> ' + new Date(),
            `Your app is listening on port ${port}`
          );
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
