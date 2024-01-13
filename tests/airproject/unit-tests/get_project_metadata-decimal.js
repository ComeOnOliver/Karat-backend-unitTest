const tokenService = require('../../../karatdao_backend/rewarddao/service/token');

const MongoDB = require('../../../karatdao_backend/mongo').DB;
// const tokenBriefDB = new MongoDB('token_brief_info');

const Web3 = require('web3');
//const NODE_URL = 'https://speedy-nodes-nyc.moralis.io/29728826f2e1a87656cd6790/eth/mainnet/archive'
const NODE_URL =
  'https://mainnet.infura.io/v3/f0f92c4173844e2da8e747499487a2d2';
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);
const minABI = require('../../../karatdao_backend/web3/config/minABI');
var axios = require('axios');

// test all tokens
// (async function () {
//     let cols = await tokenBriefDB.getAll('ethereum');
//     for(let i = 0; i < cols.length; i++) {
//         let token = cols[i];
//         //console.log("id: " + i + ", address: " + token.address + ", name: " + token.name);
//         // if(i == 178) {
//         //     console.log("");
//         // }
//         // decimal from rocksdb
//         let token_name = token.name;
//         let token_address = token.address;
//         let token_decimals_from_rocksdb = token.decimals;

//         // check address validity
//         let self_destruct = await web3.eth.getCode(token_address) == "0x" ? true : false;
//         if(self_destruct) {
//             // The call will return 0x if it selfdestruct'd. It'll also return 0x if it's an EOA or the contract was created with no code.
//             console.log("Token " + token_address + " might be self-destruct, please check decimal manually");
//             continue;
//         }

//         // decimal from web3.js
//         let contract = new web3.eth.Contract(minABI, token_address);

//         try {
//             const token_decimals_from_web3 = await contract.methods.decimals().call();
//             if(token_decimals_from_rocksdb != token_decimals_from_web3) {
//                 console.log("Token " + token_address + " decimal not equal");
//                 console.log("Decimals from rocksdb: " + token_decimals_from_rocksdb);
//                 console.log("Decimals from web3.js: " + token_decimals_from_web3);
//             }
//         }
//         catch (e) {
//             console.log("ERROR: id: " + i + ", address: " + token.address + ", name: " + token.name);
//         }
//     }

//     process.exit(1);
// })();

// test token only from uniswap
exports.run = async () => {
  let tokens = await tokenService.getUniswapTokens();
  if (tokens == null) {
    console.log('Lose response from getting uniswap list');
  }

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.chainId != 1) continue;

    let token_info = await tokenService.getTokenBrief(token.address);
    if (!token_info) continue;

    // decimal from rocksdb
    let token_name = token_info.name;
    let token_address = token_info.address;
    let token_decimals_from_rocksdb = token_info.decimals;

    // check address validity
    let self_destruct =
      (await web3.eth.getCode(token_address)) == '0x' ? true : false;
    if (self_destruct) {
      // The call will return 0x if it selfdestruct'd. It'll also return 0x if it's an EOA or the contract was created with no code.
      console.log(
        'Token ' +
          token_name +
          ', address: ' +
          token_address +
          ', might be self-destruct, please check decimal manually'
      );
      continue;
    }

    // decimal from web3.js
    let contract = new web3.eth.Contract(minABI, token_address);

    try {
      const token_decimals_from_web3 = await contract.methods.decimals().call();
      if (token_decimals_from_rocksdb != token_decimals_from_web3) {
        console.log(
          'Token ' +
            token_name +
            ' , address: ' +
            token_address +
            ', decimal not equal'
        );
        console.log('Decimals from rocksdb: ' + token_decimals_from_rocksdb);
        console.log('Decimals from web3.js: ' + token_decimals_from_web3);
      }
    } catch (e) {
      console.log(
        'ERROR: id: ' +
          i +
          ', Token: ' +
          token_name +
          ', Address: ' +
          token_address
      );
    }
  }

  console.log('pass: create_campaign - token decimal');
};
