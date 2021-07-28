const { Schema, SchemaTypes, model } = require('mongoose');

const bookReviewSchema = new Schema({
  bookId: { type: SchemaTypes.ObjectId, required: true },
  comment: { type: SchemaTypes.String, required: true },
  rating: { type: SchemaTypes.Number, required: true },
  userId: { type: SchemaTypes.ObjectId, required: true },
  createdAt: { type: SchemaTypes.Date, default: Date.now },
  updatedAt: { type: SchemaTypes.Date, default: Date.now }
});

module.exports = model('bookReview', bookReviewSchema)