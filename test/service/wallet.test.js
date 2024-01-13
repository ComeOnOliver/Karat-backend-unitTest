/**
 * walletService unit test
 */
const assert = require('assert');
const walletService = require('../../karatdao_backend/rewarddao/service/wallet');

describe('wallet unit test', function () {
  it('test method verify_balance enough balance', async () => {
    let data = {
      token: {
        chainId: 1,
        address: '0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF',
      },
      user_address: '0x8e22B546B8684B1217308D03af8D51263d15E7C9',
      amount: 1,
    };
    let res = await walletService.verify_balance(data);
    assert.ok(res);
  });
  it('test method verify_balance enough balance nft', async () => {
    let data = {
      token: {
        chainId: 1,
        address: '0x0a057B32CE9942De760eC8280cE214A860943Ec5', //TUNA PASS
      },
      user_address: '0x8e22B546B8684B1217308D03af8D51263d15E7C9',
      amount: 1,
    };
    let res = await walletService.verify_balance(data);
    assert.ok(res);
  });
  it('test method verify_balance not enough', async () => {
    let data = {
      token: {
        chainId: '56',
        address: '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1',
      },
      user_address: '0x8e22B546B8684B1217308D03af8D51263d15E7C9',
      amount: 10,
    };
    try {
      let res = await walletService.verify_balance(data);
    } catch (e) {
      assert.equal(e.code, walletService.ERR_CODE.WALLET_NOT_ENOUGH_BALANCE);
    }
  });
  after(function () {
    console.log('test finished');
    process.exit();
  });
});
