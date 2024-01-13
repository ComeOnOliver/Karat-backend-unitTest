const balance = require('../karatdao_backend/rewarddao/service/balance');
const fs = require('fs');
(async function () {
    let rawdata = fs.readFileSync('export-tokenholders-for-nft-contract-0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d.json');
    let rawJson = JSON.parse(rawdata);
    let map = new Map();
    for(account of rawJson) {
        map.set(account.HolderAddress, account.Quantity);
    }

    address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    chainId = 1;
    let balances = await balance.getBalances(address, chainId);

    if(balances.length != rawJson.length) {
        console.log("Balances length not matching: " + balance.address);
        console.log("# of Cached Balances: " + balances.length);
        console.log("# of Etherscan Balances: " + rawJson.length);
    }
    for(let i = 0; i < balances.length; i++) {
        let balance = balances[i];
        if(map.get(balance.address) != balance.amount) {
            console.log("Not Equal: " + balance.address);
            console.log("Cache Balance: " + balance.amount);
            console.log("Etherscan Balance: " + map.get(balance.address));
        }
    }

    console.log(balance.address + " checked!");
    process.exit();
})();