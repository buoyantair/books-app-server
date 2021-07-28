const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

async function authMiddleware(req, res, next) {
  const bearerHeader = req.header('Authorization')

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    if (!bearerToken) {
      return res.status(401).json({
        message: 'Missing token'
      })
    }

    jwt.verify(bearerToken, SECRET_KEY)
    req.token = bearerToken
    next()
  } else {
    res.status(401).send({
      message: 'Unauthorized user.'
    })
  }
}


module.exports = authMiddleware