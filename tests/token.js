let tokenController = require('../karatdao_backend/controller/token');

(async function () {
  address = '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1';
  chainId = 56;
  // balances = await tokenController.get_balances({address})
  // console.log('balance size', balances.length)

  // size = await tokenController.get_balances_length({address})
  // console.log('balance size', size)

  // info = await tokenController.get_info({address})
  // console.log('info', info)

  brief = await tokenController.get_token_brief({ address, chainId });
  console.log('brief', brief);

  process.exit(1);
})();
