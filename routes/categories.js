const {Router} = require('express');
const {check} = require('express-validator');
const {
  validateJWT,
  fieldsValidator,
  validateAdminRole,
} = require('../middlewares');
const {
  obtainCategories,
  obtainCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers');
const {
  validateIfCategoryIdExist
} = require('../helpers');

const router = Router();

router.get('/', obtainCategories)

router.get('/:id', [
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('id').custom(validateIfCategoryIdExist),
  fieldsValidator
], obtainCategory)

router.post('/', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  fieldsValidator
], createCategory)

router.put('/:id',[
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  check('id', 'id must be a valid mongo id').isMongoId(),
  fieldsValidator
], updateCategory)

router.delete('/:id',[
  validateJWT,
  check('id', 'id must be a valid mongo id').isMongoId(),
  check('id').custom(validateIfCategoryIdExist),
  validateAdminRole,
  fieldsValidator
], deleteCategory)

module.exports = router