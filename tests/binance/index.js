let binance = require('../../karatdao_backend/binance');

(async function () {
  last_block_high = await binance.get_blockNumber();
  console.log('last_block_high', last_block_high);
  process.exit(1);
})();
