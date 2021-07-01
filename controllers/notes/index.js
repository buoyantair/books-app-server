const express = require('express')
const jwt = require('jsonwebtoken')

const Note = require('../../models/note')

const authMiddleware = require('../auth/authMiddleware')
const notesRouter = express.Router()

async function createNote(req, res) {
  const { body: { note: data } } = req

  if (data && data.title && data.body) {
    try {
      const {_id} = jwt.decode(req.token)

      const note = new Note({...data, authorId: _id})
      const result = await note.save()

      res.send(result)
    } catch(e) {
      res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  } else {
    res.status(400).send({
      message: 'Please use a valid Note format for creating a note'
    })
  }
}

async function getNote(req, res) {
  const noteId = req.params.noteId
  
  if (noteId) {
    try {
      const note = await Note.findOne({ _id: noteId })
      if (note) {
        res.send(note)
      } else {
        res.status(404).send({
          message: 'Note not found, please try another noteId.'
        })
      }
    } catch(e) {
      res.status(500).send({
        message: 'Something went wrong, please try again.'
      })
    }
  } else {
    res.status(400).send({
      message: 'noteId not found in params.'
    })
  }
}

notesRouter.post('/notes/create', authMiddleware, createNote)
notesRouter.get('/notes/:noteId', authMiddleware, getNote)

module.exports = notesRouter
