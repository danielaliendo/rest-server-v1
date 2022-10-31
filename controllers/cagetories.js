const {response, request} = require('express');
const {Category} = require('../models');

const obtainCategories = async (req = request, res = response) => {

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

  const [count, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(!isNaN(from) ? Number(from) : 0)
      .limit(!isNaN(from) ? Number(limit) : 5)
  ])

  res.status(200).json({
    count,
    categories
  })

}

const obtainCategory = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const category = await Category.findById(id).populate('user', 'name');

    res.status(200).json({
      category
    });

  } catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

const createCategory = async (req = request, res = response) => {

  const {name} = req.body

  try {

    const categoryDB = await Category.findOne({name: name.toUpperCase()});

    if (categoryDB) {
      return res.status(400).json({
        msg: `Category ${name} already exists`
      })
    }

    // Generate data to save it
    const data = {
      name: name.toUpperCase(),
      user: req.user._id
    }

    const category = new Category(data);

    // Save category in DB
    await category.save();

    res.status(201).json({
      category
    });

  } catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

const updateCategory = async (req = request, res = response) => {

  const {id} = req.params

  const {status, user, ...data} = req.body

  data.user = req.user._id
  data.name = data.name.toUpperCase();

  try {

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
      category
    });

  } catch (e) {

    console.log(e)
    res.status(500).json({
      msg: 'Internal server errror'
    });

  }

}

const deleteCategory = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

    res.status(200).json({
      category,
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
  obtainCategories,
  obtainCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}