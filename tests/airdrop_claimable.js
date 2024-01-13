let projectController = require('../karatdao_backend/controller/project');

(async function () {
  // // check if a address is claimable (test airdrop_claimable)
  // case1: wallet_address not exist
  var data = {
    chain_id: '1',
    campaign_address: '0x60aa3bbe0f411d7e677c29210f156f1bfc0ac99e',
    wallet_address: '123',
    claimInfoHash: 'ipfs://QmVjd8NXURFxg5317FrEfwQ2jCk2TL9mkaYK7MEGQ7mAhU'
  };
  // case2: normal
  var data2 = {
    chain_id: '1',
    campaign_address: '0x60aa3bbe0f411d7e677c29210f156f1bfc0ac99e',
    wallet_address: '0x0000000000b1381708aa7bd722de1fe483245ae3',
    claimInfoHash: 'ipfs://QmVjd8NXURFxg5317FrEfwQ2jCk2TL9mkaYK7MEGQ7mAhU'
  };
  // case3: database lose connection
  var data3 = {
    chain_id: '1',
    campaign_address: '0x60aa3bbe0f411d7e677c29210f156f1bfc0ac99e',
    wallet_address: '0x0000000000b1381708aa7bd722de1fe483245ae3',
    claimInfoHash: 'ipfs://QmVjd8NXURFxg5317FrEfwQ2jCk2TL9mkaYK7MEGQ7mAhU'
  };
  //res1 = await projectController.get_wallet_claim_info(data);
  let res1 = await expectThrowsAsync(() => projectController.get_wallet_claim_info(data), "Address is not eligible");
  res2 = await projectController.get_wallet_claim_info(data2);
  res3 = await projectController.get_wallet_claim_info(data3);
  process.exit(1);
})();
