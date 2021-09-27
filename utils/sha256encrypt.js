const crypto = require('crypto');
const method = process.env['METHOD']
module.exports = (string) => {
    const newHash = crypto.createHash(method).update(string).digest('hex')
    return newHash
}