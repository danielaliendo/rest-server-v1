const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers');
const { fieldsValidator } = require('../middlewares');

const router = Router();

router.post('/login', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  fieldsValidator
], login)

router.post('/google', [
  check('token', 'token is required').not().isEmpty(),
  fieldsValidator
], googleSingIn)

module.exports = router