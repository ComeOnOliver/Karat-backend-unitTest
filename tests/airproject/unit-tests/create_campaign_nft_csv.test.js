const airdropService = require('../../../karatdao_backend/rewarddao/service/airdrop-project');

(async function () {
  var info = {
    type: 'NFT',
    csv: true,
    csvAirdropAmount: 1,
    csvList: [
      '0x0000000000B1381708aA7BD722dE1Fe483245ae3',
      '0x00000002f32C0886eE65D68059Fbdb76EF6A6996',
      '0x00000034A9ac3ee7B0a2cb2e5207DCFA1b998347',
      '0x0000003b9a0D829e3e4C62838c8609337483e6f3',
    ],
  };

  res = await airdropService.create_campaign(info);
  console.log(res);
  process.exit(1);
})();
