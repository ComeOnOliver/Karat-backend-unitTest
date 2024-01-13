const projectController = require('../../karatdao_backend/controller/project');
const communityService = require('../../karatdao_backend/rewarddao/service/community');

const assert = require('assert');
const pinataURL = 'https://karatdao.mypinata.cloud/ipfs/';
const axios = require('axios');
const _ = require('lodash');
const { ethers } = require('ethers');

let campaignType = ['NFT, TOKEN'];
let reqTypes = ['token', 'whitelist', 'community'];
describe('airdrop-project/create_campaign create NFT campaign', function () {
  let requiredToken = {
    chainId: 1,
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    name: 'AAVE',
    symbol: 'AAVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
  };

  let airdropToken = {
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 4,
    logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
  };

  let whitelist = [
    '0xc0ffee254729296a45a3885639AC7E10F9d54979',
    '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E',
  ];

  it('Create NFT Campaign with token query only', async function () {
    let data = {
      type: 'NFT',
      requirements: [
        {
          logic: 'ALL',
          airdropAmount: 1,
          requirement: [
            {
              type: 'token',
              token: requiredToken,
              requiredAmount: 1000000, //Size 2 Wallets
            },
          ],
        },
      ],
    };

    let res = await projectController.create_campaign(data);
    let claimInfoHash = res.claimInfoHash;
    let claimInfoURL = pinataURL + claimInfoHash.split('//')[1];
    let config = {
      method: 'get',
      url: claimInfoURL,
      headers: {},
    };
    let claim_info = await axios(config);

    claim_info = claim_info.data;
    let comp = claim_info.claims['0xffc97d72e13e01096502cb8eb52dee56f74dad7b'];
    assert.notEqual(comp, null);
    assert.equal(comp.amount, 1);
  });
  it('Create NFT Campaign with whitelist only', async function () {
    let data = {
      type: 'NFT',
      requirements: [
        {
          logic: 'ALL',
          airdropAmount: 1,
          requirement: [
            {
              type: 'whitelist',
              whitelist: whitelist,
            },
          ],
        },
      ],
    };

    let res = await projectController.create_campaign(data);
    let claimInfoHash = res.claimInfoHash;
    let claimInfoURL = pinataURL + claimInfoHash.split('//')[1];
    let config = {
      method: 'get',
      url: claimInfoURL,
      headers: {},
    };
    let claim_info = await axios(config);
    claim_info = claim_info.data;
    let comp = claim_info.claims[whitelist[0].toLowerCase()];
    assert.notEqual(comp, null);
    assert.equal(comp.amount, 1);
  });
  it('Create NFT Campaign with community only', async function () {
    let communities = await communityService.get_communities();
    let uuid = communities[0].uuid;
    let community = await communityService.get_community({ uuid });

    let data = {
      type: 'NFT',
      requirements: [
        {
          logic: 'ALL',
          airdropAmount: 1,
          requirement: [
            {
              type: 'community',
              community: { uuid: uuid },
            },
          ],
        },
      ],
    };

    let res = await projectController.create_campaign(data);
    let claimInfoHash = res.claimInfoHash;
    let claimInfoURL = pinataURL + claimInfoHash.split('//')[1];
    let config = {
      method: 'get',
      url: claimInfoURL,
      headers: {},
    };
    let claim_info = await axios(config);
    claim_info = claim_info.data;
    let comp = claim_info.claims[community.addresses[0].toLowerCase()];
    assert.notEqual(comp, null);
    assert.equal(comp.amount, 1);
  });
  it('Create NFT Campaign with all three requirements', async function () {
    let communities = await communityService.get_communities();
    let uuid = communities[0].uuid;
    let community = await communityService.get_community({ uuid });
    let data = {
      type: 'NFT',
      requirements: [
        {
          logic: 'ALL',
          airdropAmount: 2,
          requirement: [
            {
              type: 'community',
              community: { uuid: uuid },
            },
            {
              type: 'whitelist',
              whitelist: whitelist,
            },
            {
              type: 'token',
              token: requiredToken,
              requiredAmount: 1000000, //Size 2 Wallets
            },
          ],
        },
      ],
    };

    let res = await projectController.create_campaign(data);
    let claimInfoHash = res.claimInfoHash;
    let claimInfoURL = pinataURL + claimInfoHash.split('//')[1];
    let config = {
      method: 'get',
      url: claimInfoURL,
      headers: {},
    };
    let claim_info = await axios(config);
    claim_info = claim_info.data;
    let comp = claim_info.claims[community.addresses[0].toLowerCase()];
    assert.notEqual(comp, null);
    assert.equal(comp.amount, 2);

    let comp2 = claim_info.claims[whitelist[0].toLowerCase()];
    assert.notEqual(comp2, null);
    assert.equal(comp.amount, 2);

    let comp3 = claim_info.claims['0xffc97d72e13e01096502cb8eb52dee56f74dad7b'];
    assert.notEqual(comp3, null);
    assert.equal(comp.amount, 2);
  });

  it('Create Token Campaign with all three requirements', async function () {
    let communities = await communityService.get_communities();
    let uuid = communities[0].uuid;
    let community = await communityService.get_community({ uuid });
    let data = {
      type: 'TOKEN',
      airdropToken: airdropToken,
      requirements: [
        {
          logic: 'ALL',
          airdropAmount: 1,
          requirement: [
            {
              type: 'community',
              community: { uuid: uuid },
            },
            {
              type: 'whitelist',
              whitelist: whitelist,
            },
            {
              type: 'token',
              token: requiredToken,
              requiredAmount: 1000000, //Size 2 Wallets
            },
          ],
        },
      ],
    };

    let res = await projectController.create_campaign(data);
    let claimInfoHash = res.claimInfoHash;
    let claimInfoURL = pinataURL + claimInfoHash.split('//')[1];
    let config = {
      method: 'get',
      url: claimInfoURL,
      headers: {},
    };
    let claim_info = await axios(config);
    claim_info = claim_info.data;
    let airdropAmount = ethers.utils.parseUnits('1', 18).toHexString();
    let comp = claim_info.claims[community.addresses[0].toLowerCase()];
    assert.notEqual(comp, null);
    assert.equal(comp.amount, airdropAmount);

    let comp2 = claim_info.claims[whitelist[0].toLowerCase()];
    assert.notEqual(comp2, null);
    assert.equal(comp.amount, airdropAmount);

    let comp3 = claim_info.claims['0xffc97d72e13e01096502cb8eb52dee56f74dad7b'];
    assert.notEqual(comp3, null);
    assert.equal(comp.amount, airdropAmount);
  });
});
