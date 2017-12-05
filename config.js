exports.DATABASE_URL =
  process.env.BATTLE_SKRATCH_URL ||
  global.DATABASE_URL ||
  'mongodb://localhost/battle-skratch';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-battle-skratch';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || global.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';
