const {Router} = require('express');
const {check} = require('express-validator');
const {
  validateJWT,
  fieldsValidator,
  validateAdminRole,
} = require('../middlewares');
const {
  obtainProducts,
  obtainProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers');
const {
  validateIfProductIdExist,
  validateIfCategoryIdExist
} = require('../helpers');

const router = Router();

router.get('/', obtainProducts)

router.get('/:id', [
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('id').custom(validateIfProductIdExist),
  fieldsValidator
], obtainProduct)

router.post('/', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  check('category', 'category ref is required').isMongoId(),
  check('category').custom(validateIfCategoryIdExist),
  fieldsValidator
], createProduct)

router.put('/:id',[
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('id').custom(validateIfProductIdExist),
  fieldsValidator
], updateProduct)

router.delete('/:id',[
  validateJWT,
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('id').custom(validateIfProductIdExist),
  validateAdminRole,
  fieldsValidator
], deleteProduct)

module.exports = router