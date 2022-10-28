const { response, request } = require('express')

const validateAdminRole = (req = request, res = response, next) => {

  if (!req.user) {
    return res.status(500).json({
      msg: 'Unverified token'
    })
  }

  const {role} = req.user

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: 'Insufficient permissions - you do not have permissions to perform this action'
    })
  }

  next();

}

const verifyRole = (...roles) => {

  return (req = request, res = response, next) => {

    if (!req.user) {
      return res.status(500).json({
        msg: 'Unverified token'
      })
    }

    const {role} = req.user

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: "You don't have any permissions assigned"
      })
    }

    next();

  }

}

module.exports = {
  validateAdminRole,
  verifyRole
}