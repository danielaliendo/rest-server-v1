const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    validateRolValue,
    validateIfEmailAlreadyExist
}