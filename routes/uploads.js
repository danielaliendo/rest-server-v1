const {Router} = require('express');
const {check} = require('express-validator');
const {fieldsValidator, validateFile} = require('../middlewares');
const {loadFile, getImage, updateImageCloudinary} = require("../controllers/uploads");
const {validateCollectionsAllowed} = require("../helpers");

const router = Router();

router.post('/', validateFile, loadFile)

router.put('/:collection/:id', [
  validateFile,
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('collection').custom(c => validateCollectionsAllowed(c, ['users', 'products', 'categories'])),
  fieldsValidator
], updateImageCloudinary)
// ], updateImage)

router.get('/:collection/:id', [
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('collection').custom(c => validateCollectionsAllowed(c, ['users', 'products', 'categories'])),
  fieldsValidator
], getImage)

module.exports = router