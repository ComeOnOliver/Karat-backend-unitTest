const create_campaign_decimal = require('../unit-tests/create_campaign-decimal');
const create_campaign_logic = require('../unit-tests/create_campaign-logic');

(async function () {
  await create_campaign_decimal.run();
  await create_campaign_logic.run();

  console.log('pass: create_campaign - all');
  process.exit();
})();
