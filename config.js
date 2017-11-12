exports.DATABASE_URL =
  process.env.BATTLE_SKRATCH_URL ||
  global.DATABASE_URL ||
  'mongodb://localhost:8080/battle-skratch';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-battle-skratch';
exports.PORT = process.env.PORT || 8080;
