const {User, Role, Category, Product} = require('../models');

/**
 * @description Check role exists in the roles collection
 * @param {string} role
 * @returns {Promise<Error>}
 */

const validateRolValue = async (role = '') => {

  try {

    const roleExist = await Role.findOne({role})
    if (!roleExist) {
      return new Error(`The role ${role} is not registered in the database`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

/**
 * @description Check if email already exists on database
 * @param {string} email
 * @returns {Promise<Error>}
 */

const validateIfEmailAlreadyExist = async (email = '') => {

  try {

    const emailAlreadyExist = await User.findOne({email})

    if (emailAlreadyExist) {
      return new Error(`Email ${email} already exist in the database`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

/**
 * @description Check if user exists by its id on database
 * @param {string} id - mongoose id
 * @returns {Promise<Error>}
 */

const validateIfUserExistById = async (id = '') => {

  try {

    const userExist = await User.findById(id)

    if (!userExist) {
      return new Error(`There is no registered user with the id ${id}`)
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
      return new Error(`There is no category with the id ${id}`)
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
      return new Error(`There is no product with the id ${id}`)
    }

  } catch (e) {

    console.log(e)
    throw new Error(e)

  }

}

/**
 * validate allowed collections
 * @param c - collection received
 * @param collections - array of allowed collections
 */

const validateCollectionsAllowed = (c = '', collections = []) => {

  const isAllowed = collections.includes(c)

  if (!isAllowed) {
    return new Error(`The collection ${c} not allowed. Collections allowed: ${collections.toString()}`)
  }

  return true

}

module.exports = {
  validateRolValue,
  validateIfEmailAlreadyExist,
  validateIfUserExistById,
  validateIfCategoryIdExist,
  validateIfProductIdExist,
  validateCollectionsAllowed
}