let accountController = require('../karatdao_backend/controller/account');

(async function () {
  address = '0x8e22B546B8684B1217308D03af8D51263d15E7C9';
  wallet = await accountController.get_wallet_info({ address });
  console.log('wallet', wallet);

  wallet = await accountController.get_wallet_info2({ address });
  console.log('wallet', wallet);

  connection = await accountController.get_connection({ address });
  console.log('connection', connection);

  process.exit(1);
})();
