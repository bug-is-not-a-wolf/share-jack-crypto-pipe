const ipc = require('node-ipc');
const fs = require('fs');

const algorithm = 'aes-256-cbc'; // cbc -> Cipher Block Chaining
const password = fs.readFileSync('keys/cryptoStream.key');  // TODO: nice API with these settings

const Crypt =  require('./crypto.js');    // TODO: naming
const crypt = new Crypt(algorithm, password);

ipc.config.id = 'cryptoStream';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serve(() => {
  ipc.server.on(
    'encrypt',
    (data, socket) => {
      data.message = crypt.encrypt(data.message);
      ipc.server.emit(socket, 'encrypted', data);
    }
  );

  ipc.server.on(
    'decrypt',
    (data, socket) => {
      try {
        data.message = crypt.decrypt(data.message);
      } catch(err) {
        data.message = '';
        data.err = true;
      } finally {
        ipc.server.emit(socket, 'decrypted', data);
      }
    }
  );
});

// module.exports = function start() {
ipc.server.start();
// };
