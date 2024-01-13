let accountController = require('../karatdao_backend/controller/account');

(async function () {
  var data = {
    address: '0x8e22B546B8684B1217308D03af8D51263d15E7C9'
  };

  res = await accountController.record_wallet_info(data);
  res = await accountController.record_wallet_info(data);
  res = await accountController.record_wallet_info(data);
  process.exit(1);
})();
