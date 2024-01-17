const customError = require('./customError')
const httpStatusError = require('../../httpStatusCodes')

class APIError extends customError {
  constructor(name, status, message, isPublic = true, isOperational = true) {
    super(name, status, message, isPublic, isOperational)
  }
}

module.exports = APIError
