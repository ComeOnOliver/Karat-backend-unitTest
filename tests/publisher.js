let publisherController = require('../karatdao_backend/controller/publisher');

(async function () {
  res = await publisherController.get_projects({ publisherAddr: '0x1ddddddd' });
  console.log('res length', res.length);
  process.exit(1);
})();
