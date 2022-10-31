const {response, request} = require('express');
const {ObjectId} = require('mongoose').Types;
const {
  User,
  Category,
  Product
} = require('../models');

const availableCollections = [
  'categories',
  'products',
  'users',
  'roles',
]

const searchUsers = async (term = '', res = response) => {

  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {

    const user = await User.findById(term);

    return res.status(200).json({
      results: user ? [user] : []
    })

  }

  const regex = new RegExp(term, 'i')

  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{status: true}]
  });

  return res.status(200).json({
    results: users
  })

}

const searchCategories = async (term = '', res = response) => {

  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {

    const category = await Category.findById(term);

    return res.status(200).json({
      results: category ? [category] : []
    })

  }

  const regex = new RegExp(term, 'i')

  const categories = await Category.find({ name: regex, status: true});

  return res.status(200).json({
    results: categories
  })

}

const searchProducts = async (term = '', res = response) => {

  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {

    const product = await Product.findById(term)
                            .populate('category', 'name')
                            .populate('user', 'name')

    return res.status(200).json({
      results: product ? [product] : []
    })

  }

  const regex = new RegExp(term, 'i')

  const products = await Product.find({ name: regex, status: true })
    .populate('category', 'name')
    .populate('user', 'name')

  return res.status(200).json({
    results: products
  })

}

const search = async (req = request, res = response) => {

  const {colection, term} = req.params

  if (!availableCollections.includes(colection)) {
    return res.status(400).json({
      msg: `available collections are: ${availableCollections}`
    })
  }

  switch (colection) {
    case 'categories':
      await searchCategories(term, res)
      break;
    case 'products':
      await searchProducts(term, res)
      break;
    case 'users':
      await searchUsers(term, res)
      break;

    default:
      res.status(500).json({
        msg: 'new case for collection should be added in db',
      })
  }

};

module.exports = {
  search,
}