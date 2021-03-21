const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // check if request is available
  if (req.method === 'OPTIONS') {
    return next() // go ahead
  }
  // errors handling
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

    // token not exists
    if (!token) {
      return res.status(401).json({message: 'not authorized'})
    }
    // decode token if exists
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()

  } catch (e) {
      return res.status(401).json({message: 'not authorized'})
  }
}