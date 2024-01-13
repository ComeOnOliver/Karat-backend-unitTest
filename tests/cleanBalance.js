const tokenService = require('../karatdao_backend/rewarddao/service/token');
const rocksdb = require('../karatdao_backend/rocksdb/util');
const fs = require('fs');

(async function () {
  address = '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d';
  address = address.toLowerCase();
  chainId = 1;

  let rawdata = fs.readFileSync('NFT.json');
  let addresses = JSON.parse(rawdata);
  for(let address of addresses) {
    let tokenInfo = await tokenService.getTokenBrief(address, this.chainId);
    let initBlock = tokenInfo.initBlock - 1;
  
    // let value = {high_block: initBlock, balances: {}};
    // await rocksdb.request('dbr/put', ['balanceCache', 'ethereum', address, value]);
  }

  process.exit();
})();