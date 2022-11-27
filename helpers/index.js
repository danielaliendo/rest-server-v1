const dbValidators = require('./db-validators');
const jwtGenerator = require('./generate-jwt');
const googleAuthValidators = require('./validate-google-auth');
const uploadFiles = require('./upload-file');

module.exports = {
  ...dbValidators,
  ...jwtGenerator,
  ...googleAuthValidators,
  ...uploadFiles
}