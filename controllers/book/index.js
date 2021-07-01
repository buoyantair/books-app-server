const express = require('express')
const jwt = require('jsonwebtoken')

const Book = require('../../models/book')

const authMiddleware = require('../auth/authMiddleware')
const bookRouter = express.Router()

async function createBook(req, res) {
  const { body: { book: data } } = req

  if (data && data.title && data.body) {
    try {
      const { _id } = jwt.decode(req.token)

      const note = new Note({ ...data, authorId: _id })
      const result = await note.save()

      res.send(result)
    } catch (e) {
      res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  } else {
    res.status(400).send({
      message: 'Please use a valid Book format for creating a book'
    })
  }
}

async function getBook(req, res) {
  const bookId = req.params.bookId

  if (bookId) {
    try {
      const note = await Book.findOne({ _id: bookId })
      if (note) {
        res.send(note)
      } else {
        res.status(404).send({
          message: 'Book not found, please try another bookId.'
        })
      }
    } catch (e) {
      res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  } else {
    res.status(400).send({
      message: 'bookId not found in params.'
    })
  }
}

bookRouter.post('/book/create', authMiddleware, createBook)
bookRouter.get('/book/:bookId', authMiddleware, getBook)

module.exports = bookRouter
