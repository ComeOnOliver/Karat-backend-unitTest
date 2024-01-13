let projectController = require('../../../karatdao_backend/controller/project');

var tokenCsv = {
  type: 'TOKEN',
  disableElysium: true,
  airdropToken: {
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 1,
    logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
  },
  csv: true,
  csvAirdropAmount: 0.1,
  csvList: [
    '0x0000000000B1381708aA7BD722dE1Fe483245ae3',
    '0x00000002f32C0886eE65D68059Fbdb76EF6A6996',
    '0x00000034A9ac3ee7B0a2cb2e5207DCFA1b998347',
    '0x0000003b9a0D829e3e4C62838c8609337483e6f3',
  ],
};

(async function () {
  let info = tokenCsv;
  res = await projectController.create_campaign(info);
  console.log(res);

  process.exit(1);
})();
