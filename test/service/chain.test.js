/**
 * chainService unit test
 */
const assert = require('assert');
const chainService = require('../../karatdao_backend/rewarddao/service/chain');
const _ = require('lodash');

describe('chainService unit test', function () {
  it('test method get_blockNumber', async () => {
    let chainId = '56';
    let block = await chainService.getChain(chainId).get_blockNumber();
    assert.ok(_.isInteger(block));
  });

  it('test method getInitBlock', async () => {
    let chainId = '56';
    let addr = '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1';
    let block = await chainService.getChain(chainId).getInitBlock(addr);
    assert.ok(_.isInteger(block));
  });

  it('test method getBalances', async () => {
    let chainId = '56';
    let addr = '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1';
    let balanceList = await chainService.getChain(chainId).getBalances(addr);
    assert.ok(balanceList.length);
  });

  describe('getBalanceOf unit test', function () {
    let account = '0x8e22B546B8684B1217308D03af8D51263d15E7C9';
    it('getBalanceOf owned ERC20 Token', async () => {
      let erc20CropBytes = {
        address: '0x37FC4b48CE93469dbEA9918468993C735049642a',
        decimals: 18,
      };
      let balance = await chainService
        .getChain('1')
        .getBalanceOf(erc20CropBytes, account);
      assert(balance == 66.6);
    });
    it('getBalanceOf not owned ERC20 Token', async () => {
      let erc20WBTC = {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        decimals: 18,
      };
      let balance = await chainService
        .getChain('1')
        .getBalanceOf(erc20WBTC, account);
      assert(balance == 0);
    });
    it('getBalanceOf owned NFT', async () => {
      let tunaNft = {
        address: '0x0a057B32CE9942De760eC8280cE214A860943Ec5',
      };
      let balance = await chainService
        .getChain('1')
        .getBalanceOf(tunaNft, account);
      assert(balance == 1);
    });
    it('getBalanceOf NFT not owned', async () => {
      let bayc = {
        address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      };
      let balance = await chainService
        .getChain('1')
        .getBalanceOf(bayc, account);
      assert(balance == 0);
    });
    it('getBalanceOf ETH', async () => {
      let eth = {
        address: '0x0000000000000000000000000000000000000000',
        decimals: 18,
      };
      let balance = await chainService.getChain('1').getBalanceOf(eth, account);
      assert(balance > 10);
    });

    it('getBalanceOf BSC', async () => {
      let eth = {
        address: '0x0000000000000000000000000000000000000000',
        decimals: 18,
      };
      let balance = await chainService.getChain(56).getBalanceOf(eth, account);
      assert(balance > 0.1);
    });
    it('getBalanceOf AVAX', async () => {
      let eth = {
        address: '0x0000000000000000000000000000000000000000',
        decimals: 18,
      };
      let balance = await chainService
        .getChain(43114)
        .getBalanceOf(eth, account);
      assert(balance > 0.005);
    });
  });
  // TODO add more test cases later
  // describe('getBalanceOfMulticall unit test', function () {
  //   it('getBalanceOfMulticall', async () => {
  //     const ethToken = {
  //       address: '0x0000000000000000000000000000000000000000',
  //       decimals: 18,
  //     };
  //     try {
  //       let balance = await chainService
  //         .getChain(1)
  //         ._getBalanceOfMulticall(ethToken, account);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   });
  // });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
