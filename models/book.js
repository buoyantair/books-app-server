const { Schema, SchemaTypes, model } = require('mongoose')

const bookSchema = new Schema({
  title: SchemaTypes.String,
  body: SchemaTypes.String,
  authorId: SchemaTypes.ObjectId
})

module.exports = model('Book', bookSchema)
