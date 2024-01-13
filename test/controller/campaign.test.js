const assert = require('assert');
let campaignController = require('../../karatdao_backend/controller/campaign');
let siweController = require('../../karatdao_backend/controller/siwe');
const campaignService = require('../../karatdao_backend/rewarddao/service/campaign');
const WalletService = require('../../karatdao_backend/rewarddao/service/wallet');
/*
describe('Campaign Unit Test', function () {
  describe('Create Test', function () {
    let headers = {};
    let new_header = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });
    (async () => {
      new_header = await siweController.verify({
        message:
          '192.168.1.121:3000 wants you to sign in with your Ethereum account:\n0x2A0842BF7E4A7a0379E4a7c6557ba27626036f1d\n\nSigning is safe and no transactions will be initiated.\n\nURI: http://192.168.1.121:3000\nVersion: 1\nChain ID: 1\nNonce: oTzJdqZmlu44AEibU\nIssued At: 2022-11-16T22:33:50.232Z',
        signature:
          '0x9a68e241ae4214bfd4f86f31452327479bcfea2a33eeed9bb1144355537158c127c9992952e86a7913b2e3459613699b803e9bbd5ea032b5bc521b6f3fdd39311c',
      });
    })();

    it('Test Create Campaign', async () => {
      let post = {
        form: {
          blocks: [
            {
              uid: 'v0rpz7',
              title: 'Test',
              id: 'title',
            },
          ],
        },
        config: {},
        ext: {},
        contract: {},
      };
      let result1 = await campaignController.create(post, { headers });
      let campaign = await campaignService.get({ id: result1.id });
      assert.ok(campaign);
      assert.ok(typeof result1 === 'object');
      assert.ok(result1.user_id === headers.user_id);
      assert.ok(post.form === result1.form);
    });

    it('Test Create Campaign with Empty Header', async () => {
      let post = {
        form: {
          blocks: [
            {
              uid: 'v0rpz7',
              title: 'Test',
              id: 'title',
            },
          ],
        },
        config: {},
        ext: {},
        contract: {},
      };
      try {
        await campaignController.create(post, {});
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NO_HEADER);
      }
    });

    it('Test Create Existing Campaign', async () => {
      let post = {
        form: {
          blocks: [
            {
              uid: 'v0rpz7',
              title: 'Test',
              id: 'title',
            },
          ],
        },
        config: {},
        ext: {},
        contract: {},
      };
      try {
        await campaignController.create(post, { headers });
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_ALREADY_EXISTS);
      }
    });
  });

  describe('Update Test', function () {
    let headers = {};
    let new_header = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });
    (async () => {
      new_header = await siweController.verify({
        message:
          '192.168.1.121:3000 wants you to sign in with your Ethereum account:\n0x2A0842BF7E4A7a0379E4a7c6557ba27626036f1d\n\nSigning is safe and no transactions will be initiated.\n\nURI: http://192.168.1.121:3000\nVersion: 1\nChain ID: 1\nNonce: oTzJdqZmlu44AEibU\nIssued At: 2022-11-16T22:33:50.232Z',
        signature:
          '0x9a68e241ae4214bfd4f86f31452327479bcfea2a33eeed9bb1144355537158c127c9992952e86a7913b2e3459613699b803e9bbd5ea032b5bc521b6f3fdd39311c',
      });
    })();

    it('Test Update Campaign', async () => {
      let post = {
        form: {
          key1: {
            type: 'text11111',
          },
          key2: {
            type: 'number',
          },
        },
        campaign_id: '1DWKG1bBb',
      };
      let result2 = await campaignController.update(post, { header: headers });
      let user_id = parseInt(result2.user_id);
      assert.ok(user_id === headers.user_id);
      let campaign = await campaignService.get({ id: result2.id });
      assert.ok(campaign);
      assert.ok(typeof result2 === 'object');
    });

    it('Test Update Campaign with Empty Header', async () => {
      let post = {
        form: {
          key1: {
            type: 'text11111',
          },
          key2: {
            type: 'number',
          },
        },
        campaign_id: '1DWKG1bBb',
      };
      try {
        await campaignController.update(post, {});
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NO_HEADER);
      }
    });

    it('Test Update Non-existent Campaign', async () => {
      let post = {
        form: {
          key1: {
            type: 'text11111',
          },
          key2: {
            type: 'number',
          },
        },
        campaign_id: '1DW666bBb',
      };
      try {
        await campaignController.update(post, { header: headers });
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NOT_EXIST);
      }
    });

    it('Test Update Campaign with Another User_id', async () => {
      let post = {
        form: {
          key1: {
            type: 'text11111',
          },
          key2: {},
          type: 'number',
        },
        campaign_id: '1DWKG1bBb',
      };
      try {
        await campaignController.update(post, { header: new_header });
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NO_AUTH);
      }
    });
  });

  describe('Delete Test', function () {
    let headers = {};
    let new_header = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });
    (async () => {
      new_header = await siweController.verify({
        message:
          '192.168.1.121:3000 wants you to sign in with your Ethereum account:\n0x2A0842BF7E4A7a0379E4a7c6557ba27626036f1d\n\nSigning is safe and no transactions will be initiated.\n\nURI: http://192.168.1.121:3000\nVersion: 1\nChain ID: 1\nNonce: oTzJdqZmlu44AEibU\nIssued At: 2022-11-16T22:33:50.232Z',
        signature:
          '0x9a68e241ae4214bfd4f86f31452327479bcfea2a33eeed9bb1144355537158c127c9992952e86a7913b2e3459613699b803e9bbd5ea032b5bc521b6f3fdd39311c',
      });
    })();

    it('Test Delete Campaign', async () => {
      let delete_campaign_id = {
        campaign_id: '1E6g572GV',
      };
      let result3 = await campaignController.delete(delete_campaign_id, {
        header: headers,
      });
      let uuid = parseInt(result3.user_id);
      assert.notEqual(result3.user_id, null);
      assert.ok(uuid === headers.user_id);
      assert.ok(typeof result3 === 'object');
      assert.ok(result3.status == 'D');
    });

    it('Test Delete Campaign with Empty Header', async () => {
      let delete_campaign_id = {
        campaign_id: '1E6g572GV',
      };
      try {
        await campaignController.delete(delete_campaign_id, {});
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NO_HEADER);
      }
    });

    it('Test Delete Non-existent Campaign', async () => {
      let delete_campaign_id = {
        campaign_id: '1E6g666GV',
      };
      try {
        await campaignController.delete(delete_campaign_id, {
          header: headers,
        });
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NOT_EXIST);
      }
    });

    it('Test Delete Campaign with Another User_id', async () => {
      let delete_campaign_id = {
        campaign_id: '1E6g572GV',
      };
      try {
        await campaignController.delete(delete_campaign_id, {
          header: new_header,
        });
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NO_AUTH);
      }
    });
  });

  describe('Get Campaigns by Creator Test', function () {
    let headers = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });

    it('Test Get Campaigns by Creator', async () => {
      let creator_id = {
        user_id: '13',
      };
      let result = await campaignController.get_campaigns_by_creator(
        creator_id,
        {
          header: headers,
        }
      );
      let campaign = await campaignService.get({ id: result[0].id });
      assert.ok(campaign.user_id == headers.user_id);
      assert.notEqual(result[0].id, null);
      assert.notEqual(result[0].user_id, null);
      assert.ok(typeof result[0] === 'object');
    });

    it('Test Get Campaigns by Creator with Empty Header', async () => {
      let creator_id = {
        user_id: '13',
      };
      try {
        await campaignController.get_campaigns_by_creator(creator_id, {});
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NO_HEADER);
      }
    });

    it('Test Get Campaigns by Non-existent Creator', async () => {
      let creator_id = {
        user_id: '66',
      };
      try {
        await campaignController.get_campaigns_by_creator(creator_id, {
          header: headers,
        });
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NOT_EXIST);
      }
    });
  });

  describe('Get Campaigns by ID Test', function () {
    let headers = {};
    before(async () => {
      headers = await siweController.verify({
        message:
          'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
        signature:
          '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
      });
    });

    it('Test Get Campaigns by ID', async () => {
      let test_id = {
        campaign_id: '1DWKG1bBb',
      };
      let result = await campaignController.get_campaign_by_id(test_id, {
        header: headers,
      });
      assert.notEqual(result, null);
      assert.ok(result.id == test_id.campaign_id);
    });

    it('Test Get Campaigns by Non-existent ID', async () => {
      let test_id = {
        campaign_id: '1DW666bBb',
      };
      try {
        await campaignController.get_campaign_by_id(test_id, {});
      } catch (e) {
        assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NOT_EXIST);
      }
    });
  });
  after(function () {
    console.log('Test Finished');
    process.exit();
  });
});
*/
describe('Submit Test', function () {
  let headers = {};
  // let new_header = {};
  before(async () => {
    headers = await siweController.verify({
      message:
        'localhost:8080 wants you to sign in with your Ethereum account:\n0xe96A40669716Cf0A1507d8c852ed66Be30a4De99\n\nSign in with Ethereum to the app.\n\nURI: http://localhost:8080\nVersion: 1\nChain ID: 1\nNonce: 5k8ZirFtl41F3zhPd\nIssued At: 2022-08-29T02:32:14.166Z',
      signature:
        '0x18e2c0b641b6615ab932c6643214a5af4798b1618912ab7164f274cd0dff44f3396f92b6a3b091f903cabaf5f1db44b352f15ac4553f0b68ccbc408eaf084ab51b',
    });
  });

  it('Test Submit', async () => {
    let post = {
      context: {},
      campaign_id: '1GK2Mglkp',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e, 'Error: You have already submitted before');
    }
  });

  it('Test Submit Non-existent Campaign', async () => {
    let post = {
      context: {},
      campaign_id: '1GK2666kp',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e.code, campaignService.ERR_CODE.CAMPAIGN_NOT_EXIST);
    }
  });

  it('Test Submit Running Campaign', async () => {
    let post = {
      context: {},
      campaign_id: '1DWKvu8zH',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e, 'Error: The campaign is not running');
    }
  });

  it('Test Submit Already-Submitted Campaign', async () => {
    let post = {
      context: {},
      campaign_id: '1GK2Mglkp',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e, 'Error: You have already submitted before');
    }
  });

  it('Test Like Tweet', async () => {
    let post = {
      context: {},
      campaign_id: '1G2zGY1FP',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(
        e,
        'Error: You have not liked the tweet. Please like and try again.'
      );
    }
  });

  it('Test Retweeted', async () => {
    let post = {
      context: {},
      campaign_id: '1G2Autf3n',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(
        e,
        'Error: You have not retweeted the tweet. Please retweet and try again.'
      );
    }
  });

  it('Test Not Verify Email', async () => {
    let post = {
      context: {},
      campaign_id: '1EkUA4mY5',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e, 'Error: User has not verified email');
    }
  });

  it('Test Not Follow', async () => {
    let post = {
      context: {},
      campaign_id: '1GeN4dCdf',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(
        e,
        'Error: You have not followed adada. Please follow and try again.'
      );
    }
  });

  it('Test Not Enough Balance', async () => {
    let post = {
      context: {},
      campaign_id: '1GPQ0wINT',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e.code, walletService.ERR_CODE.WALLET_NOT_ENOUGH_BALANCE);
    }
  });

  it('Test Not Provide Email', async () => {
    let post = {
      context: {},
      campaign_id: '1ERMTzGfz',
    };
    try {
      await campaignController.submit(post, { headers });
    } catch (e) {
      assert.equal(e, 'Error: Please provide your email');
    }
  });

  after(function () {
    console.log('Test Finished');
    process.exit();
  });
});
