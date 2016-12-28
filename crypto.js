const crypto = require('crypto');

module.exports = class cryptor {
  constructor(algorithm, initVector) {
    this.algorithm = algorithm;
    this.initVector = initVector;
  }

  encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.initVector);

    var cryptedText = cipher.update(text, 'utf8', 'hex');
    cryptedText += cipher.final('hex');
    return cryptedText;
  };

  decrypt(text) {
    const decipher = crypto.createDecipher(this.algorithm, this.initVector);

    var decryptedText = decipher.update(text, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
  };
};
