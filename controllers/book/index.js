const express = require('express')
const jwt = require('jsonwebtoken')

const Book = require('../../models/book')

const authMiddleware = require('../auth/authMiddleware')
const bookRouter = express.Router()

/**
 * @api {post} /book/create Create a book
 * @apiName createBook
 * @apiGroup Book
 * @apiDescription Create a book
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response} 
 */
async function createBook(req, res) {
  const { body } = req

  if (body && body.title && body.body) {
    try {
      const { _id } = jwt.decode(req.token)

      const book = new Book({ ...body, createrId: _id })
      const result = await book.save()

      return res.send(result)
    } catch (e) {
      return res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  } else {
    return res.status(400).send({
      message: 'Please use a valid Book format for creating a book'
    })
  }
}

/**
 * @api {get} /book/:bookId Get a book
 * @apiName getBook
 * @apiGroup Book
 * @apiDescription Get a book
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
async function getBook(req, res) {
  const bookId = req.params.bookId

  if (bookId) {
    try {
      const book = await Book.findOne({ _id: bookId })
      if (book) {
        return res.send(book)
      } else {
        return res.status(404).send({
          message: 'Book not found, please try another bookId.'
        })
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  } else {
    return res.status(400).send({
      message: 'bookId not found in params.'
    })
  }
}

bookRouter.post('/book/create', authMiddleware, createBook)
bookRouter.get('/book/:bookId', authMiddleware, getBook)

module.exports = bookRouter
