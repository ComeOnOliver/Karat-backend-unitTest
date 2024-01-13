/**
 * tokenService unit test
 */
const assert = require('assert');
const tokenService = require('../../karatdao_backend/rewarddao/service/token');

describe('tokenService unit test', function () {
  it('test method getTokenBrief is not null', async () => {
    let addr = '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1';
    let chainId = '56';
    let info = await tokenService.getTokenBrief(addr, chainId);
    assert.notEqual(info, null);
  });

  it('test method getTokenBrief is null', async () => {
    let addr = 'xxxxxxx';
    let chainId = '56';
    let info = await tokenService.getTokenBrief(addr, chainId);
    assert.equal(info, null);
  });

  it('getTokenBrief on polygon chain should not throw error', async () => {
    let addr = '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1';
    let chainId = '137';
    let info = await tokenService.getTokenBrief(addr, chainId);
    assert.equal(info, null);
  });

  it('getTokenBrief on avalanche chain should not throw error', async () => {
    let addr = '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1';
    let chainId = '43114';
    let info = await tokenService.getTokenBrief(addr, chainId);
    assert.equal(info, null);
  });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
