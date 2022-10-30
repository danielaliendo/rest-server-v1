const dbValidators = require('./db-validators');
const jwtGenerator = require('./generate-jwt');
const googleAuthValidators = require('./validate-google-auth');

module.exports = {
  ...dbValidators,
  ...jwtGenerator,
  ...googleAuthValidators
}