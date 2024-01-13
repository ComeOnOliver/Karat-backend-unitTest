const airdropService = require('../../../karatdao_backend/rewarddao/service/airdrop-project');

(async function () {
  var cvx = {
    requiredToken: {
      chainId: 1,
      address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
      name: 'Convex Token',
      symbol: 'CVX',
      decimals: 18,
      logoURI:
        'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
    },
    requiredAmount: 110,
  };
  var eth = {
    requiredToken: {
      chainId: 1,
      address: '0x0000000000000000000000000000000000000000',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    requiredAmount: 110,
  };
  res = await airdropService.get_qualified_wallets(cvx);
  console.log(res);

  res = await airdropService.get_qualified_wallets(eth);
  console.log(res);
  process.exit(1);
})();
