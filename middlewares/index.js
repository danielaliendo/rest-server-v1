const fieldsValidator = require('./fields-validator');
const jwtValidator = require('./validate-jwt');
const roleValidator = require('./validate-role');
const validateFiles = require('./validate-file');

module.exports = {
  ...fieldsValidator,
  ...jwtValidator,
  ...roleValidator,
  ...validateFiles
}