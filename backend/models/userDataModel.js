const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemsSchema = Schema({
  _id: {
    type: String,
    required: false
  },
  _idOfCategory: {
    type: String,
    required: false
  },
  _idOfList: {
    type: String,
    required: false
  },
  itemName: {
    type: String,
    required: false
  },
  itemDescription: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  unit: {
    type: String,
    required: false
  }
  
})

const categoriesSchema = Schema({
  _id: {
    type: String,
    required: false
  },
  _idOfList: {
    type: String,
    required: false
  },
  categoryName: {
    type: String,
    required: false
  },
  items: [itemsSchema]
})



const userDataSchema = Schema({

  _id: {
    type: String,
    required: true

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true

  },

  listName: {
    type: String,
    required: false
  },

  listCategories: [categoriesSchema]

})



const UserData = mongoose.model('UserData', userDataSchema)


module.exports = UserData