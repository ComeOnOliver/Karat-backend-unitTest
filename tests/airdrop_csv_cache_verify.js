const rocksdb = require('../karatdao_backend/rocksdb/util');
const Web3 = require('web3');
const NODE_URL = [
  'https://speedy-nodes-nyc.moralis.io/29728826f2e1a87656cd6790/eth/mainnet/archive',
  'https://bscrpc.com',
  'https://polygon-mainnet.g.alchemy.com/v2/QsLw1EgblQ2ukY4MNcMdXyMKZvIa257F',
];
// const NODE_URL =
//   'https://mainnet.infura.io/v3/f0f92c4173844e2da8e747499487a2d2';
// const provider = new Web3.providers.HttpProvider(NODE_URL);
// const web3 = new Web3(provider);
var axios = require('axios');

const AirdropFactoryABI = require('../karatdao_backend/web3/config/AirdropFactoryABI');
const NFTAirdropFactoryABI = require('../karatdao_backend/web3/config/NFTAirdropFactoryABI');
const pinataURL = 'https://karatdao.mypinata.cloud/ipfs/';
let config = {
  method: 'get',
  url: pinataURL,
  headers: {},
};

getCampaigns = async (factoryAddresses, ABI) => {
  let campaignses = [];
  for (let i = 0; i < factoryAddresses.length; i++) {
    let factoryAddress = factoryAddresses[i];
    let provider = new Web3.providers.HttpProvider(NODE_URL[i]);
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(ABI, factoryAddress);
    let campaigns = await contract.methods.getAllCampaigns().call();
    campaignses.push(campaigns);
  }

  return campaignses;
};

(async function () {
  let chainIds = ['1', '56', '137'];
  let factoryAddresses = [
    '0xd51AB741F5a9ABaf72Af49AAD8Fe6dCc4C74D036',
    '0x98583A6E36386DD463182d7E13C3beDe9B6CFDbd',
    '0x98583A6E36386DD463182d7E13C3beDe9B6CFDbd',
  ];
  let NFTFactoryAddresses = [
    '0x98583A6E36386DD463182d7E13C3beDe9B6CFDbd',
    '0x589c7083bf5DEC96A1bAfa49D5621C247aC22D3e',
    '0x589c7083bf5DEC96A1bAfa49D5621C247aC22D3e',
  ];

  // 1. get all campaigns under factory
  let factoryCampaigns = await getCampaigns(
    factoryAddresses,
    AirdropFactoryABI
  );
  let NFTfactoryCampaigns = await getCampaigns(
    NFTFactoryAddresses,
    NFTAirdropFactoryABI
  );
  [0];
  for (let i = 0; i < chainIds.length; i++) {
    let chain_id = chainIds[i];
    let campaign_address1 = factoryCampaigns[i];
    let campaign_address2 = NFTfactoryCampaigns[i];

    for (let i = 0; i < campaign_address1.length; i++) {
      let request = await rocksdb.request('dbr/get', [
        'campaignClaimInfo',
        chain_id,
        campaign_address1[i],
      ]);
      if (request == null || request == undefined)
        console.log('no cache(Coin): ' + campaign_address1[i]);
    }

    for (let i = 0; i < campaign_address2.length; i++) {
      let request = await rocksdb.request('dbr/get', [
        'campaignClaimInfo',
        chain_id,
        campaign_address2[i],
      ]);
      if (request == null || request == undefined)
        console.log('no cache(NFT): ' + campaign_address2[i]);
    }
  }

  console.log('cache verified!');
})();
