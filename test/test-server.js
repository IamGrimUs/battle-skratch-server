// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');

// const mongoose = require('mongoose');

// const should = chai.should();
// const jwt = require('jsonwebtoken');

// const server = require('../server');
// const { runServer, closeServer } = require('../server');
// const Department = require('../app/department/department.model');
// const User = require('../app/user/user.model');
// const { TEST_DATABASE_URL } = require('../config');
// const config = require('../config');

// const app = server.app;

// const createAuthToken = user => {
//   return jwt.sign({ user }, config.JWT_SECRET, {
//     subject: user.username,
//     expiresIn: config.JWT_EXPIRY,
//     algorithm: 'HS256'
//   });
// };

// chai.use(chaiHttp);

// // used to generate data for db
// function seedUserData() {
//   const seedData = [];

//   for (let i = 1; i <= 5; i++) {
//     seedData.push(generateUserData());
//   }

//   return User.insertMany(seedData);
// }

// function generateUserData() {
//   return {
//     isAdmin: false,
//     name: faker.name.firstName(),
//     biography: faker.lorem.sentences(),
//     password: 'password',
//     battlesEntered: 0,
//     battlesWon: 0
//   };
// }

// function seedBattleData() {
//   const seedData = [];
//   seedData.push(generateBattleData());
//   return Battle.insert(seedData);
// }

// function generateBattleData() {
//   let beatId = generateDepartmentName();
//   let battleTypeId = new userDepartment(
//     departmentName,
//     '41224d776a326fb40f00000' + departments.indexOf(departmentName)
//   );
//   return {
//     startDate: {
//       $date: '2017-09-02T07:00:00.000Z'
//     },
//     endDate: {
//       $date: '2017-10-01T08:00:00.000Z'
//     }
//   };
// }
