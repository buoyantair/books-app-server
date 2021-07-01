const jwt = require('jsonwebtoken')
const user = require('../../models/user')

const { SECRET_KEY } = process.env

async function loginController(req, res) {
  const { body: { username, password } } = req

  if (!username && password) {
    return res.status(401).send({
      message: 'Please provide a username to login.'
    })
  }

  if (!password && username) {
    return res.status(401).send({
      message: 'Please provide a password to login.'
    })
  }

  if (!username && !password) {
    return res.status(401).send({
      message: 'Please provide both username & password to login.'
    })
  }

  if (username && password) {
    const result = await user.findOne({
      username: username
    }).exec()

    if (result) {
      const token = jwt.sign({ username, _id: result._id }, SECRET_KEY)
      return res.status(200).send({
        token
      })
    } else {
      return res.status(401).send({
        message: 'User not found, please create an account to login.'
      })
    }
  }
}


module.exports = loginController