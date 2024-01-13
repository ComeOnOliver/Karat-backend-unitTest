const assert = require('assert');
let campaignResponseController = require('../../karatdao_backend/controller/campaign_response');
let siweController = require('../../karatdao_backend/controller/siwe');
const campaignResponseService = require('../../karatdao_backend/rewarddao/service/campaign_response');

describe('Campaign Response Unit Test', function () {
  describe('Campaign Response Test', function () {
    let headers = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });

    it('Test Get Campaign Response', async () => {
      let post = {
        campaign_id: '1DWKvu8zH',
      };
      let result1 = await campaignResponseController.get_campaign_response(
        post,
        { headers }
      );
      assert.ok(result1);
    });

    it('Test Get Campaign Response with Empty Header', async () => {
      let post = {
        campaign_id: '1DWKvu8zH',
      };
      try {
        await campaignResponseController.get_campaign_response(post, {});
      } catch (e) {
        assert.equal(
          e.code,
          campaignResponseService.ERR_CODE.CAMPAIGN_NO_HEADER
        );
      }
    });

    it('Test Get Campaigns by Non-existent Campaign_id', async () => {
      let post = {
        campaign_id: '1DW666bBb',
      };
      try {
        await campaignResponseController.get_campaign_response(post, {
          headers,
        });
      } catch (e) {
        assert.equal(
          e.code,
          campaignResponseService.ERR_CODE.CAMPAIGN_NOT_EXIST
        );
      }
    });
  });

  describe('Campaign Response Length Test', function () {
    let headers = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });

    it('Test Get Campaign Response Length', async () => {
      let post = {
        campaign_id: '1DWKvu8zH',
      };
      let result1 = await campaignResponseController.get_length(post);
      assert.ok(result1);
      assert.ok(typeof result1 === 'number');
    });

    it('Test Get Campaigns by Non-existent Campaign_id', async () => {
      let post = {
        campaign_id: '1DW666bBb',
      };
      try {
        await campaignResponseController.get_length(post);
      } catch (e) {
        assert.equal(
          e.code,
          campaignResponseService.ERR_CODE.RESPONSE_NOT_EXIST
        );
      }
    });
  });

  describe('Campaign Status Test', function () {
    let headers = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });

    it('Test Get Campaign Status', async () => {
      let post = { campaign_id: '1GK2Mglkp' };
      let result2 = await campaignResponseController.get_response_status(post, {
        headers,
      });
      let user_id = parseInt(result2.user_id);
      assert.ok(result2);
      assert.ok(headers.user_id === user_id);
    });

    it('Test Get Campaign Status with Empty Header', async () => {
      let post = { campaign_id: '1GK2Mglkp' };
      try {
        await campaignResponseController.get_campaign_response(post, {});
      } catch (e) {
        assert.equal(
          e.code,
          campaignResponseService.ERR_CODE.CAMPAIGN_NO_HEADER
        );
      }
    });

    it('Test Get Campaigns by Non-existent campaign_id', async () => {
      let post = {
        campaign_id: '1DW666bBb',
      };
      try {
        await campaignResponseController.get_campaign_response(post, {
          headers,
        });
      } catch (e) {
        assert.equal(
          e.code,
          campaignResponseService.ERR_CODE.CAMPAIGN_NOT_EXIST
        );
      }
    });
  });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
