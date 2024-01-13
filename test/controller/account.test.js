/**
 * account unit test
 */
 const assert = require('assert');
 let accountController = require('../../karatdao_backend/controller/account');
 
 describe('account controller unit test', function () {
   it('test method get_wallet_info', async () => {
    address = '0x8e22B546B8684B1217308D03af8D51263d15E7C9';
    wallet = await accountController.get_wallet_info({ address });
    assert.notEqual(wallet.nft, null);
    assert.notEqual(wallet.token, null);

   });

   it('test method get_wallet_info2', async () => {
    address = '0x8e22B546B8684B1217308D03af8D51263d15E7C9';
    wallet = await accountController.get_wallet_info2({ address });
    assert.notEqual(wallet.nft, null);
    assert.notEqual(wallet.token, null);
   });
 

   after(function () {
     console.log('test finished');
    //  process.exit();
   });
 });


