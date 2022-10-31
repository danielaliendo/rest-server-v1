const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
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
    required: [true, 'user ref is required']
  }
});

CategorySchema.methods.toJSON = function () {
  const {_id, __v, status, ...category} = this.toObject();
  category.id = _id
  return category
}

module.exports = model('Category', CategorySchema);