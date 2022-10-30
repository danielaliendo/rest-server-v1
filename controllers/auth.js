const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const {generateJWT, googleVerifyAuth} = require('../helpers');
const {User} = require('../models');

const login = async (req = request, res = response) => {

  const {email, password} = req.body

  try {

    // Verify if email exist
    const user = await User.findOne({email});

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

const googleSingIn = async (req = request, res = response) => {

  const {token:userToken} = req.body;

  try {

    const {email, name, img} = await googleVerifyAuth(userToken);

    let user = await User.findOne({email})

    if (!user) {

      const data = {
        email,
        name,
        img,
        password: 'new user',
        google: true,
        role: 'USER_ROLE'
      }

      user = new User(data);
      await user.save();

    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'blocked user, contact site administrator'
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.status(200).json({
      user,
      token
    })

  } catch (e) {
    console.log(e)
    res.status(400).json({
      ms: 'Failed to verify token'
    })
  }

};

module.exports = {
  login,
  googleSingIn
}