class customError extends Error {
  constructor(name, status, message, isPublic, isOperational) {
    super(message)
    this.name = name
    this.status = status
    this.isPublic = isPublic
    this.isOperational = isOperational
    Error.captureStackTrace(this)
  }
}

module.exports = customError
