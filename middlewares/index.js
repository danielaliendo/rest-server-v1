const fieldsValidator = require('./fields-validator');
const jwtValidator = require('./validate-jwt');
const roleValidator = require('./validate-role');

module.exports = {
  ...fieldsValidator,
  ...jwtValidator,
  ...roleValidator
}