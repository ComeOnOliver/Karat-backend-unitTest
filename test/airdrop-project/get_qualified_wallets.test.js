const projectController = require('../../karatdao_backend/controller/project');
const assert = require('assert');

describe('airdrop-project/get_qualified_wallets', function () {
  it('Query Token', async function () {
    let requiredToken = {
      chainId: 1,
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      name: 'AAVE',
      symbol: 'AAVE',
      decimals: 18,
      logoURI:
        'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
    };

    let data = {
      // type: 'token',
      requiredToken,
      requiredAmount: 10000, //Size 2 Wallets
    };
    let res = await projectController.get_qualified_wallets(data);
    assert.notEqual(res.length, null);
    assert.notEqual(res.examples, null);
  });

  it('Query NFT', async function () {
    let requiredToken = {
      name: 'Bored Ape Yacht Club',
      symbol: 'BAYC',
      logoURI:
        'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s120',
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      chainId: 1,
    };
    let data = {
      // type: 'token',
      requiredToken,
      requiredAmount: 1, //Size 2 Wallets
    };
    let res = await projectController.get_qualified_wallets(data);
    assert.notEqual(res.length, null);
    assert.notEqual(res.examples, null);
  });
});
