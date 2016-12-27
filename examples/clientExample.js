const ipc = require('node-ipc');

ipc.config.id = 'cryptoClient';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.connectTo(
  'cryptoStream',
  function () {
    ipc.of.cryptoStream.on(
      'connect',
      function () {
        ipc.of.cryptoStream.emit(
          'encrypt', {
            id: 'password',
            message: 'ABCD-efgh-1234-%^&*'
          }
        );
      }
    );

    ipc.of.cryptoStream.on(
      'encrypted',
      function (data) {
        console.log('Data', data);
      }
    );

  }
);

const someData = 'c19b924553b1cb02715376f681244ef8c83449c4dadf840dcabcf076387cd6db';


ipc.connectTo(
  'cryptoStream',
  function () {
    ipc.of.cryptoStream.on(
      'connect',
      function () {
        ipc.of.cryptoStream.emit(
          'decrypt', {
            id: 'some crypted data',
            message: someData
          }
        );
      }
    );

    ipc.of.cryptoStream.on(
      'decrypted',
      function (data) {
        console.log('Data', data);
      }
    );

  }
);
