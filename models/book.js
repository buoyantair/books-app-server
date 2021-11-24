const { Schema, SchemaTypes, model } = require('mongoose')

const bookSchema = new Schema({
  title: SchemaTypes.String,
  body: SchemaTypes.String,
  creatorId: SchemaTypes.ObjectId
})

module.exports = model('Book', bookSchema)
