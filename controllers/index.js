const authControllers = require('../controllers/auth');
const usersControllers = require('../controllers/users');

module.exports = {
  ...authControllers,
  ...usersControllers
}