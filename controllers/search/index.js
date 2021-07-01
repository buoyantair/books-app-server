const express = require('express')

const Book = require('../../models/book')

const authMiddleware = require('../auth/authMiddleware')
const searchRouter = express.Router()


/**
 * Enables the client to search various different types of objects and get the results.
 * TODO: Possibly look for pagination options in future.
 * 
 * This functionality only works when Text Search Indexes are created
 * on the given MongoDB collections
 * Reference - https://docs.mongodb.com/manual/text-search/
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function search(req, res) {
  const { type, query } = req.query

  if (type === 'book') {
    try {
      const searchQuery = query?.length ? { $text: { $search: query } } : {}
      const result = await Book.find(searchQuery)
      if (result) {
        return res.send(result)
      } else {
        return res.status(404).send({
          message: 'No books available at this moment.'
        })
      }
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  }

  return res.status(501).send({
    message: 'Currently only books search is supported.'
  })
}

searchRouter.get('/search', authMiddleware, search)

module.exports = searchRouter
