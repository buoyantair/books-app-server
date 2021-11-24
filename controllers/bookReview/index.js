const express = require('express')
const jwt = require('jsonwebtoken')

const BookReview = require('../../models/bookReview')

const authMiddleware = require('../auth/authMiddleware')
const bookReviewRouter = express.Router()


/**
 * @api {get} /book/reviews/:bookId
 * @apiName getReviewsByBookId
 * @apiGroup BookReview
 * @apiDescription Get all book reviews by book id
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
async function getReviewsByBookId(req, res) {
  const { bookId } = req.params
  if (bookId) {
    try {
      const bookReviews = await BookReview.find({ bookId })
      return res.status(200).json(bookReviews)
    } catch (e) {
      return res.status(500).json({
        message: 'Something went wrong, please try again'
      })
    }
  } else {
    return res.status(400).json({
      message: 'Please use a valid BookReview format for creating a book review'
    })
  }
}


/**
 * @api {post} /book/reviews/create
 * @apiName CreateBookReview
 * @apiGroup BookReview
 * @apiDescription Create a book review
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
async function createBookReview(req, res) {
  const { body: {
    comment,
    rating,
    bookId
  } } = req;
  if (comment && rating && bookId) {
    try {
      const { _id: userId } = jwt.decode(req.token)
      const bookReview = new BookReview({
        comment,
        rating,
        bookId,
        userId,
      })
      const result = await bookReview.save()
      return res.status(201).json(result)
    } catch (e) {
      return res.status(500).json({
        message: 'Something went wrong, please try again'
      })
    }
  } else {
    return res.status(400).json({
      message: 'Please use a valid BookReview format for creating a book review'
    })
  }
}

bookReviewRouter.post('/book/reviews/create', authMiddleware, createBookReview)
bookReviewRouter.get('/book/reviews/:bookId', getReviewsByBookId)

module.exports = bookReviewRouter