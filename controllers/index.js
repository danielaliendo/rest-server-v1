const authControllers = require('../controllers/auth');
const usersControllers = require('../controllers/users');
const categoriesControllers = require('../controllers/cagetories');
const productsControllers = require('../controllers/products');
const searchControllers = require('../controllers/search');

module.exports = {
  ...authControllers,
  ...usersControllers,
  ...categoriesControllers,
  ...productsControllers,
  ...searchControllers
}