/**
 * siwe unit test
 */
const assert = require('assert');
let siweController = require('../../karatdao_backend/controller/siwe');

describe('siwe controller unit test', function () {

  it('test method get_nonce', async () => {
    let nonce = null;
    nonce = await siweController.get_nonce();
    assert.notEqual(nonce, null);
  });


  it('test method verify ok', async () => {
    let fields = await siweController.verify({
      "message": "localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z",
      "signature": "0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b"
    });
    assert.notEqual(fields.token, null);
  });

  it('test method verify fail', async () => {
    let error = null;
    try {
      await siweController.verify({
        "message": "localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z",
        "signature": "0xxxxxxxxxxxxxxxxxxxxxx"
      });
    } catch (err) {
      error = err;
    }
    assert.notEqual(error, null);
  });


  after(function () {
    console.log('test finished');
    // process.exit();
  });
});
