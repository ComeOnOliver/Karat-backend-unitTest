const airdropService = require('../../../karatdao_backend/rewarddao/service/airdrop-project');

(async function () {
  var info = {
    type: 'TOKEN',
    fulllist: false,
    requirements: [
      {
        logic: 'ALL',
        airdropAmount: 1000,
        requirement: [
          {
            requiredToken: {
              chainId: 1,
              address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
              name: '1inch',
              symbol: '1INCH',
              decimals: 18,
              logoURI:
                'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
            },
            requiredAmount: 20,
          },
        ],
      },
    ],
  };

  res = await airdropService.get_query_result(info);
  console.log(res);
  process.exit(1);
})();
