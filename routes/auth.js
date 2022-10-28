const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers');
const { fieldsValidator } = require('../middlewares');

const router = Router();

router.post('/login', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  fieldsValidator
], login)

module.exports = router