const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require('../helpers');
const {User} = require('../models');

const login = async (req, res = response) => {

  const {email, password} =  req.body

  try {

    // Verify if email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'email / password are wrong - correo'
      })
    }

    // If is a active user
    if (!user.status) {
      return res.status(400).json({
        msg: 'email / password are wrong - status false'
      })
    }

    // Verify password

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        msg: 'email / password are wrong - invalid password'
      })
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })
  } catch (e) {

    console.log(e)
    res.status(500).json({
      error: 'Internal server error: contact the server administrator'
    })

  }
}

module.exports = {
  login
}