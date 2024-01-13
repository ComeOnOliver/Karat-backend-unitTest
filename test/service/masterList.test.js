/**
 * masterList addition unit test
 */

const assert = require('assert');
// const masterService = require('../../karatdao_backend/rewarddao/service/master');
const tokenController = require('../../karatdao_backend/controller/token');
const MongoDB = require('../../karatdao_backend/mongo').DB;
const karatdaoDB = new MongoDB('karatdao');

describe('masterList unit test', function () {
  it('test the selected token is successfully added into masterList', async () => {
    upload = await tokenController.add_token_info({
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e15',
      chainId: 137,
      name: 'TestAddDB',
    });
    let testItem = await karatdaoDB.find('masterList', {
      _id: '137-0xc2132D05D31c914a87C6611C10748AEb04B58e15',
    });

    assert.notEqual(upload && testItem.length > 0, true);
  });

  it('test the selected token is already in the masterList', async () => {
    try {
      upload = await tokenController.add_token_info({
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e15',
        chainId: 137,
        name: 'TestAddDB',
      });
    } catch (e) {
      assert.equal(e.message, 'Error: Token already in the list');
    } finally {
      await tokenController.delete_token_info({
        _id: '137-0xc2132D05D31c914a87C6611C10748AEb04B58e15',
      });
    }
  });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
