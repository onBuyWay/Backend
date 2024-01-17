const APIError = require('../class/errors/APIError')
const httpStatusCodes = require('../httpStatusCodes')

module.exports = {
  apiErrorHandler(err, req, res, next) {
    const errResponse = {
      status: 'error',
      error: {
        name: err.name,
        message: err.isPublic ? err.message : err.name,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
      }
    }
    if (err instanceof APIError) {
      res.status(err.status).json(errResponse)
    } else {
      res.status(500).json(errResponse)
    }
    next(err)
  }
}
