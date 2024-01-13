const { ethers, utils } = require('ethers');

// console.log(ethers.BigNumber.from(10).pow(18));
// console.log(ethers.BigNumber.from(10).pow(18).mul(1).toString());

const x = utils.parseUnits('0.1', 18);
console.log(x.toString());

console.log(ethers.BigNumber.from('0x016345785d8a0000').toString());
console.log(ethers.BigNumber.from('0x0bebc200').toString());
