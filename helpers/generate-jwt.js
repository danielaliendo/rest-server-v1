const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

  return new Promise((resolve, reject) => {
    const payload = {uid}
    jwt.sign(payload, process.env.SECRET_PRIVATED_KEY, {
      expiresIn: '1h'
    }, (error, token) => {
      if (error) {
        console.log(e)
        reject('Failed to generate token')
      } else {
        resolve(token)
      }
    })

  })

}

module.exports = {
  generateJWT
}