const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const mongoose = require('mongoose');

const should = chai.should();
const jwt = require('jsonwebtoken');

// const server = require('../server');
const { runServer, closeServer, app } = require('../server');

const User = require('../app/user/userModel');
const { TEST_DATABASE_URL } = require('../config');
const config = require('../config');

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.name,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

chai.use(chaiHttp);

// used to generate data for db
function seedUserData() {
  const seedData = [];

  for (let i = 1; i <= 5; i++) {
    seedData.push(generateUserData());
  }

  return User.insertMany(seedData);
}

function generateUserData() {
  return {
    isAdmin: false,
    name: faker.name.firstName(),
    biography: faker.lorem.sentences(),
    password: 'password',
    battlesEntered: 0,
    battlesWon: 0
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('User API resource', function() {
  let mockUser;
  let mockJwt;
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(async function() {
    let users = await seedUserData();
    mockUser = users[0];
    mockJwt = createAuthToken(users[0]);
    return seedUserData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {
    it('should return all existing users', function() {
      let res;
      return chai
        .request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${mockJwt}`)
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.users.should.have.length.of.at.least(1);
          return res.body.users.length;
        })
        .then(function(count) {
          res.body.users.should.have.lengthOf(count);
        });
    });

    it('should return users with the right fields', function() {
      let resUser;
      return chai
        .request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${mockJwt}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.users.should.be.a('array');
          res.body.users.should.have.length.of.at.least(1);

          res.body.users.forEach(function(user) {
            user.should.be.a('object');
            user.should.include.keys(
              'id',
              'name',
              'battlesEntered',
              'battlesWon'
            );
          });
          resUser = res.body.users[0];
          return User.findById(resUser.id);
        })
        .then(function(user) {
          resUser.id.should.equal(user.id);
          resUser.name.should.equal(user.name);
          resUser.battlesEntered.should.equal(user.battlesEntered);
          resUser.battlesWon.should.equal(user.battlesWon);
        });
    });
  });
});
