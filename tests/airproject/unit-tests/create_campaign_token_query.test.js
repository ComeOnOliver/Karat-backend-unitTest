let projectController = require('../../../karatdao_backend/controller/project');

const tokenQuery = `{
    "type": "TOKEN",
    "csv": false,
    "airdropToken": {
        "name": "Uniswap",
        "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "symbol": "UNI",
        "decimals": 18,
        "chainId": 4,
        "logoURI": "ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg"
    },
    "requirements": [
        {
            "logic": "ANY",
            "airdropAmount": 0.1,
            "requirement": [
                {
                    "type":"token",
                    "token": {
                        "chainId": 1,
                        "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
                        "name": "Aave",
                        "symbol": "AAVE",
                        "decimals": 18,
                        "logoURI": "https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110"
                    },
                    "requiredAmount": 2222
                },
                {
                    "type": "whitelist",
                    "whitelist": ["123"]
                }
            ]
        }
    ]
}`;

(async function () {
  let info = JSON.parse(tokenQuery);
  res = await projectController.create_campaign(info);
  console.log(res);

  process.exit(1);
})();
