const {Router} = require('express');
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

router.post('/', postUser);

router.patch('/', patchUser);

module.exports = router