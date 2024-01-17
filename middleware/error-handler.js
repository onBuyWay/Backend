const APIError = require('../class/errors/APIError')
const httpStatusCodes = require('../httpStatusCodes')

module.exports = {
  apiErrorHandler(err, req, res, next) {
    const errMessage = {
      name: err.name,
      message: null,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    }
    if (err instanceof APIError) {
      res
        .status(err.status)
        .json({ ...errMessage, message: err.isPublic ? err.message : err.name })
    } else {
      res.status(500).json({ ...errMessage, message: err.message })
    }
    next(err)
  }
}
