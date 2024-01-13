let imageController = require('../karatdao_backend/controller/image');

(async function () {
  upload = await imageController.read_image(
    {url:"QmcS8rV8EgFWqMesCvzW1EVsUEcfhZB1Fsj2b6PJySct3x"});
  console.log(upload);
  process.exit(1);
})();