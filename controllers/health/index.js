function healthController(req, res) {
  res.contentType('text/plain')
  res.send('Everything is working well!')
}

module.exports = healthController
