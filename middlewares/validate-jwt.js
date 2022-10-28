const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const { User } = require('../models');

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      msg: 'unauthorized'
    })
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRET_PRIVATED_KEY)
    req.uid = uid

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'unauthorized - user does not exist in the database'
      })
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'unauthorized'
      })
    }

    req.user = user

    next();
  } catch (e) {
    console.log(e)
    return res.status(401).json({
      msg: 'Invalid token'
    })
  }

}

module.exports = {
  validateJWT
}