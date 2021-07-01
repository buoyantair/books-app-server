const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const { SECRET_KEY } = process.env

async function signupController(req, res) {
  const { body: { username, password } } = req

  if (!username && password) {
    return res.status(401).send({
      message: 'Please provide a username to signup.'
    })
  }

  if (!password && username) {
    return res.status(401).send({
      message: 'Please provide a password to signup.'
    })
  }

  if (!username && !password) {
    return res.status(401).send({
      message: 'Please provide both username & password to signup.'
    })
  }

  if (username && password) {

    const findResult = await User.findOne({
      username
    }).exec()

    if (findResult) {
      return res.status(403).send({
        message: 'Given username already exists, please choose a different username.'
      })
    }

    const user = new User({ username, password })
    const saveResult = await user.save()

    res.send(saveResult)
  } else {
    res.status(500).send({
      message: "Something's wrong on the server."
    })
  }
}


module.exports = signupController