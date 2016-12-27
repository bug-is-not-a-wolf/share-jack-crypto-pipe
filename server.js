const ipc = require('node-ipc');
const crypt = require('./crypto.js');

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
      data.message = crypt.decrypt(data.message);
      ipc.server.emit(socket, 'decrypted', data);
    }
  );
});

ipc.server.start();