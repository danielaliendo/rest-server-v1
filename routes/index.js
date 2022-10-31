const authRouter = require('./auth');
const userRouter = require('./users');
const pathRouter = require('./products');
const searchRouter = require('./search');

module.exports = {
  authRouter,
  userRouter,
  pathRouter,
  searchRouter
}