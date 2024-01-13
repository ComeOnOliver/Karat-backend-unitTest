const probe = require('probe-image-size');
(async function () {
  let result = await probe(
    'https://karatdao.mypinata.cloud/ipfs/Qmdm7zVSNcVyDn7XsumYgPbnXVzyA5ogUTpBx3jsdBFTJ8'
  );
  console.log(result);
  process.exit(1);
})();
