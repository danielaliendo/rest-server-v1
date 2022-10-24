const {Router} = require('express');
const {check} = require('express-validator');
const {fieldsValidator} = require('../middlewares/fields-validator');
const {
    getUsers,
    putUser,
    deleteUser,
    postUser,
    patchUser
} = require('../controllers/users');
const {
    validateRolValue,
    validateIfEmailAlreadyExist,
    validateIfUserExistById
} = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('id', 'id is not a valid mongo id').isMongoId(),
    check('id').custom(validateIfUserExistById),
    check('role').custom(validateRolValue),
    fieldsValidator
], putUser);

router.delete('/:id', [
    check('id', 'id is not a valid mongo id').isMongoId(),
    check('id').custom(validateIfUserExistById),
    fieldsValidator
], deleteUser);

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password must be equal to or greater than 6 characters').isLength({min: 6}),
    check('email', 'email is invalid').isEmail(),
    check('email').custom(validateIfEmailAlreadyExist),
    check('role').custom(validateRolValue),
    fieldsValidator
], postUser);

router.patch('/', patchUser);

module.exports = router