let projectController = require('../../../karatdao_backend/controller/project');

var info = {
  type: 'TOKEN',
  airdropToken: {
    address: '0x4550003152f12014558e5ce025707e4dd841100f',
  },
  requirements: [
    {
      logic: 'ALL',
      airdropAmount: 1000,
      requirement: [
        {
          requiredToken: {
            chainId: 56,
            address: '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1',
            name: 'GMT',
            symbol: 'GMT',
            decimals: 18,
            logoURI:
              'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
          },
          requiredAmount: 30,
        },
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

(async function () {
  res = await projectController.create_campaign(info);
  console.log(res);

  process.exit(1);
})();
