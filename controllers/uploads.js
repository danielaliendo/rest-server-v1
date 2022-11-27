const {response, request} = require('express');
const {uploadFile} = require("../helpers");
const {User, Product, Category} = require("../models");
const path = require("path");
const fs = require("fs");

const loadFile = async (req = request, res = response) => {

  try {
    const fileName = await uploadFile(req.files, undefined, 'imgs');
    res.status(200).json({
      name: fileName
    })
  } catch (e) {
    res.status(400).json({
      msg: e
    })
  }

};

const updateImage = async (req = request, res = response) => {

  const {id, collection} = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id ${id}`
        })
      }
      break;
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with id ${id}`
        })
      }
      break;
    case 'categories':
      model = await Category.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no category with id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg: `A model associated with this collection has not been found ${collection}`
      })
  }

  if (model.img) {

    const imgPath = path.join(__dirname, '../uploads/', collection, model.img)

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath)
    }

  }

  try {
    model.img = await uploadFile(req.files, undefined, collection)
    console.log(model)
    await model.save();
    res.status(200).json({
      id,
      collection,
      model
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      msg: e
    })
  }

};

const getImage = async (req = request, res = response) => {

  const {id, collection} = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id ${id}`
        })
      }
      break;
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with id ${id}`
        })
      }
      break;
    case 'categories':
      model = await Category.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no category with id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg: `A model associated with this collection has not been found ${collection}`
      })
  }

  if (model.img) {

    const imgPath = path.join(__dirname, '../uploads/', collection, model.img)

    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath)
    }

  }

  const imgPath = path.join(__dirname, '../assets/no-image.jpg')

  if (fs.existsSync(imgPath)) {
    return res.sendFile(imgPath)
  } else {
    res.status(500).json({msg: 'Error getting image'})
  }

};

module.exports = {
  loadFile,
  updateImage,
  getImage
}