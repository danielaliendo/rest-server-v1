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

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUser);

router.delete('/', deleteUser);

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password must be equal to or greater than 6 characters').isLength({min: 6}),
    check('email', 'email is invalid').isEmail(),
    check('role', 'rol is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    fieldsValidator
], postUser);

router.patch('/', patchUser);

module.exports = router