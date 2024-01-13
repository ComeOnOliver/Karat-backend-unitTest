/**
 * communityService unit test
 */
const assert = require('assert');
const communityService = require('../../karatdao_backend/rewarddao/service/community');

describe('community unit test', function () {
  let added_uuid;
  it('add method ', async () => {
    let community = {
      addresses: [
        '0x62F89C7756da3FBBC4e0b19FC2F1F318ddb8fDA0',
        '0xb3e7D2F9E5c1d50b1fD0f9e62147fc5b862598E0',
      ],
      name: 'KaratDAO',
    };
    added_uuid = await communityService.add_community({ community });
    assert.notEqual(added_uuid, null);
  });
  it('del_community method ', async () => {
    await communityService.del_community({
      uuid: added_uuid,
    });
    let community = await communityService.get_community({ added_uuid });
    assert.equal(community, null);
  });
  it('get_communities method ', async () => {
    let communities = await communityService.get_communities();
    assert.notEqual(communities, null);
  });
  it('get_community method ', async () => {
    let communities = await communityService.get_communities();
    let uuid = communities[0].uuid;
    let community = await communityService.get_community({ uuid });
    assert.notEqual(community.addresses, null);
    assert.notEqual(community.name, null);
  });
  it('get_community_addresses method ', async () => {
    let communities = await communityService.get_communities();
    let uuid = communities[0].uuid;
    let addresses = await communityService.get_community_addresses(uuid);
    assert.notEqual(addresses, null);
  });

  it('get unexisting community', async () => {
    let community = await communityService.get_community('uuid');
    assert.equal(community, null);
    let addresses = await communityService.get_community_addresses('uuid');
    assert.equal(addresses, null);
  });
  after(function () {
    console.log('test finished');
    process.exit();
  });
});
