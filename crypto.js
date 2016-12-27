const crypto = require('crypto');

const algorithm = 'aes-256-cbc';  // cbc -> Cipher Block Chaining
const initVector = 'a password';  // TODO: init vector from file

module.exports.encrypt = function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, initVector);
  var cryptedText = cipher.update(text, 'utf8', 'hex');
  cryptedText += cipher.final('hex');
  return cryptedText;
};

module.exports.decrypt = function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, initVector);
  var decryptedText = decipher.update(text, 'hex', 'utf8');
  decryptedText += decipher.final('utf8');
  return decryptedText;
};