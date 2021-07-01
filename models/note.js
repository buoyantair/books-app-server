const { Schema, SchemaTypes, model } = require('mongoose')

const noteSchema = new Schema({
  title: SchemaTypes.String,
  body: SchemaTypes.String,
  authorId: SchemaTypes.ObjectId
})

module.exports = model('Note', noteSchema)
