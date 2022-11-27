const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  status: {
    type: String,
    default: true,
    required: [true, 'status is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category ref is required']
  },
  description: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  },
  img: {
    type: String
  }
});

ProductSchema.methods.toJSON = function () {
  const {__v, status, ...product} = this.toObject();
  return product
}

module.exports = model('Product', ProductSchema);