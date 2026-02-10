const crypto = require('crypto');
const config = require('../config');

/**
 * @param {String} input 
 * @returns {String} base64
 */
function hashSha256Base64(input) {
    return crypto
        .createHash('sha256')
        .update(input)
        .digest('base64');
}
/**
 * @param {String} input 
 * @returns {String} base64
 */
function hashSha512Base64(input) {
    return crypto
        .createHash('sha512')
        .update(input)
        .digest('base64');
}

function generateSaltHex(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

function hashPassword(plainPassword, salt){
    return hashSha256Base64(salt+hashSha512Base64(plainPassword+salt)+config.SECRET_PEPPER);
}

module.exports = {
    hashSha256Base64,
    generateSaltHex,
    hashPassword
};