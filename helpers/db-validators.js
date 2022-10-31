const {User, Role, Category, Product} = require('../models');

/**
 * @description Check role exists in the roles collection
 * @param {string} role
 * @returns {Promise<void>}
 */

const validateRolValue = async (role = '') => {

  try {

    const roleExist = await Role.findOne({role})
    if (!roleExist) {
      throw new Error(`The role ${role} is not registered in the database`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

/**
 * @description Check if email already exists on database
 * @param {string} email
 * @returns {Promise<void>}
 */

const validateIfEmailAlreadyExist = async (email = '') => {

  try {

    const emailAlreadyExist = await User.findOne({email})

    if (emailAlreadyExist) {
      throw new Error(`Email ${email} already exist in the database`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

/**
 * @description Check if user exists by its id on database
 * @param {string} id - mongoo id
 * @returns {Promise<void>}
 */

const validateIfUserExistById = async (id = '') => {

  try {

    const userExist = await User.findById(id)

    if (!userExist) {
      throw new Error(`There is no registered user with the id ${id}`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

const validateIfCategoryIdExist = async (id) => {

  try {

    const category = await Category.findById(id)

    if (!category) {
      throw new Error(`There is no category with the id ${id}`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

const validateIfProductIdExist = async (id) => {

  try {

    const product = await Product.findById(id)

    if (!product) {
      throw new Error(`There is no product with the id ${id}`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

module.exports = {
  validateRolValue,
  validateIfEmailAlreadyExist,
  validateIfUserExistById,
  validateIfCategoryIdExist,
  validateIfProductIdExist
}