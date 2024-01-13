/**
 * userService unit test
 */
const assert = require('assert');
const userService = require('../../karatdao_backend/rewarddao/service/user');

let send_verify_info = null
describe('userService unit test', function () {
  // it('test method ', async () => {
  //   let user_id = '6';
  //   let email = 'sh081042@gmail.com'
  //   let info = await userService.send_verify(user_id, email, false);
  //   send_verify_info = info;
  //   assert.notEqual(info, null);
  // });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
