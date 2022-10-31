const {response, request} = require('express');
const {Product} = require('../models');

const obtainProducts = async (req = request, res = response) => {

  const {limit = 5, from = 0} = req.query
  const query = {status: true}

  if (isNaN(from)) {
    return res.status(400).json([
      {
        "value": from,
        "msg": "from must be a number",
        "param": "from",
        "location": "query"
      },
    ])
  }

  if (isNaN(limit)) {
    return res.status(400).json([
      {
        "value": limit,
        "msg": "limit must be a number",
        "param": "limit",
        "location": "query"
      },
    ])
  }

  const [count, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .skip(!isNaN(from) ? Number(from) : 0)
      .limit(!isNaN(from) ? Number(limit) : 5)
  ])

  res.status(200).json({
    count,
    products
  })

}

const obtainProduct = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const product = await Product.findById(id).populate('user', 'name');

    res.status(200).json({
      product
    });

  } catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

const createProduct = async (req = request, res = response) => {

  const {status, user, name, ...body} = req.body

  try {

    const productDB = await Product.findOne({name: name.toUpperCase()});

    if (productDB) {
      return res.status(400).json({
        msg: `Product ${name} already exists`
      })
    }

    // Generate data to save it
    const data = {
      ...body,
      name: name.toUpperCase(),
      user: req.user._id
    }

    const product = new Product(data);

    // Save Product in DB
    await product.save();

    res.status(201).json({
      product
    });

  } catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

const updateProduct = async (req = request, res = response) => {

  const {id} = req.params

  const {status, user, ...data} = req.body

  data.user = req.user._id
  data.name = data.name.toUpperCase();

  try {

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
      product
    });

  } catch (e) {

    console.log(e)
    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

const deleteProduct = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});

    res.status(200).json({
      product,
      user: req.user
    });

  } catch (e) {

    console.log(e)
    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

module.exports = {
  obtainProducts,
  obtainProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}