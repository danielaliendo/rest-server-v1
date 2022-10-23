const Role = require('../models/role');

const validateRolValue = async (role = '') => {

    const roleExist = await Role.findOne({role})

    if (!roleExist) {
        throw new Error(`The role ${role} is not registered in the database`)
    }

}

module.exports = {
    validateRolValue
}