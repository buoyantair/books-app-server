const { Schema, SchemaTypes, model } = require('mongoose')

const userSchema = new Schema({
  username: SchemaTypes.String,
  password: SchemaTypes.String
})

module.exports = model('User', userSchema)
