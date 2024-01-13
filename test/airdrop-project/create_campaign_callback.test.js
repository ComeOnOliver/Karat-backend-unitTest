// Manually create the json file to test correct data is written to the db with different input variants
const projectController = require('../../karatdao_backend/controller/project');
const fs = require('fs');
const rocksdb = require('../../karatdao_backend/rocksdb/util');
const assert = require('assert');

describe('create_campaign_callback', function () {
  let claim_info = {
    claims: {
      '0x0x8e22B546B8684B1217308D03af8D51263d15E7C9': {
        amount: 0,
        proof: [
          '0xc8a603a9c26ffeac3713690a43d2be3b7c754ac2cfa49743c428e4ec9fd7b7f8',
          '0xd9ff401a8c47edfbab3f0b0e70620630617db6b347f1777bca30700fa90f3325',
          '0x5ec1f04479fba7b07daf8a7696983490d211ea2ceaa5ea5ac02a5b4647a55b8f',
          '0x6bce87025f8e0c5a23a554ebe264cac4bcd6fe33ea96b08bf0ce66d0b742474e',
          '0x6821202726597888eb553d1e139ca33e0b76709b391568bdd67d0f4ecd09c187',
          '0xd0acb5962a16003e6f3c604397dfc03f27d8228885cf9d7c7e7d17e3cf4482b5',
          '0x0b840eea1e40c0647a5c4ee4f41ac1d2a4eb4c3128cc1cc47bfeb75e0598dffe',
          '0x2793926740bd9c160918caef63e328e0d6d1d93079581dae513b428b5e672543',
          '0xdb1e9344efe127e6e5e743e1e172071c37963f3319b00c7a3a10de9592358070',
          '0x29123797811f7144669e4679b5833ebcd4811e97a48bd1d77263f55661e695ff',
          '0xf3994cd7b1d2b241ad829c23be07fa6c2d24f25348bcfb48ffcfe2f76d71c3cb',
          '0x414baf8586a1f0d099259251ca5458bfc71da8daf38eaa6fc9affa3170840168',
        ],
      },
    },
  };

  let campaignAddress = '0x98583a6e36386dd463182d7e13c3bede9b6cfdbd';
  it('write to db correctly', async function () {
    let data = {
      chainId: '1',
      merkleRoot: 'test',
      campaignAddress: campaignAddress.toLowerCase(),
    };
    let claim_info_modified = claim_info;
    claim_info_modified.claims[
      '0x0x8e22B546B8684B1217308D03af8D51263d15E7C9'
    ].amount = 1;
    fs.writeFileSync('test.json', JSON.stringify(claim_info_modified));
    await projectController.create_campaign_callback(data);
    const res = await rocksdb.request('dbr/get', [
      'campaignClaimInfo',
      '1',
      campaignAddress.toLowerCase(),
    ]);
    assert.deepEqual(res, claim_info_modified);
    assert.ok(!fs.existsSync('test.json'));
  });
  it('write to db correctly with chainId is a number', async function () {
    let data = {
      chainId: 1,
      merkleRoot: 'test',
      campaignAddress: campaignAddress,
    };
    let claim_info_modified = claim_info;
    claim_info_modified.claims[
      '0x0x8e22B546B8684B1217308D03af8D51263d15E7C9'
    ].amount = 2;
    fs.writeFileSync('test.json', JSON.stringify(claim_info_modified));
    await projectController.create_campaign_callback(data);
    const res = await rocksdb.request('dbr/get', [
      'campaignClaimInfo',
      '1',
      campaignAddress.toLowerCase(),
    ]);
    assert.deepEqual(res, claim_info_modified);
    assert.ok(!fs.existsSync('test.json'));
  });
  it('write to db json correctly with campaignAddress is capatilized', async function () {
    let data = {
      chainId: '1',
      merkleRoot: 'test',
      campaignAddress: campaignAddress,
    };
    let claim_info_modified = claim_info;
    claim_info_modified.claims[
      '0x0x8e22B546B8684B1217308D03af8D51263d15E7C9'
    ].amount = 3;
    fs.writeFileSync('test.json', JSON.stringify(claim_info_modified));
    await projectController.create_campaign_callback(data);
    const res = await rocksdb.request('dbr/get', [
      'campaignClaimInfo',
      '1',
      campaignAddress.toLowerCase(),
    ]);
    assert.deepEqual(res, claim_info_modified);
    assert.ok(!fs.existsSync('test.json'));
  });
});
