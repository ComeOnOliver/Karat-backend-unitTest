const opensea = require('./karatdao_backend/opensea');
const hrtime = require('perf_hooks').performance.now;

(async function () {
  let address = '0x8e22B546B8684B1217308D03af8D51263d15E7C9';

  let nfts = await opensea.getNFT(address);

  console.log(nfts);
})();
