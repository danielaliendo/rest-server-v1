const {Router} = require('express');
const {search} = require('../controllers');

const router = Router();

router.get('/:colection/:term', search)

module.exports = router