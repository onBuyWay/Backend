module.exports = {
  customError(message, statusCode, code) {
    const err = new Error(message)
    err.statusCode = statusCode
    return err
  }
}
