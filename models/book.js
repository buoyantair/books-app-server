const { Schema, SchemaTypes, model } = require('mongoose')

const bookSchema = new Schema({
  title: SchemaTypes.String,
  body: SchemaTypes.String,
  createrId: SchemaTypes.ObjectId
})

module.exports = model('Book', bookSchema)
