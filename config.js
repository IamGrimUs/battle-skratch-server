exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://r-double-l:toothPile333@ds129315.mlab.com:29315/battle-skratch';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-battle-skratch';
exports.PORT = process.env.PORT || 8080;
