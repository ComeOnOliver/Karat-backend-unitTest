let projectController = require('../../../karatdao_backend/controller/project');

(async function () {
  var info = {
    type: 'NFT',
    // disableElysium: true,
    requirements: [
      {
        logic: 'ALL',
        airdropAmount: 1,
        requirement: [
          {
            type: 'token',
            token: {
              chainId: 1,
              address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
              name: 'AAVE',
              symbol: 'AAVE',
              decimals: 18,
              logoURI:
                'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
            },
            requiredAmount: 1000000, //Size 2 Wallets
          },
          {
            type: 'whitelist',
            whitelist: ['123', '456'],
          },
        ],
      },
    ],
  };

  res = await projectController.create_campaign(info);
  console.log(res);

  process.exit(1);
})();
