/**
 * emailService unit test
 */
const assert = require('assert');
const emailService = require('../../karatdao_backend/rewarddao/service/email');

let send_verify_info = null
describe('emailService unit test', function () {
  it('test method send_verify', async () => {
    let user_id = '6';
    let email = 'sh081042@gmail.com'
    let info = await emailService.send_verify(user_id, email, false);
    send_verify_info = info;
    assert.notEqual(info, null);
  });

  it('test method email_verify ok', async () => {
    await emailService.verify_email(send_verify_info.code);
  });

  it('test method email_verify had been verified', async () => {
    try {
      await emailService.verify_email(send_verify_info.code);
    } catch (e) {
      assert.equal(e.code, emailService.ERR_CODE.EMAIL_HAD_VERIFIED);
    }
  });

  it('test method email_verify is no', async () => {
    try {
      await emailService.verify_email('xxxxxxx');
    } catch (e) {
      assert.equal(e.code, emailService.ERR_CODE.EMAIL_VERIFY_NO);
    }
  });

  it('test method email_verify is expired', async () => {
    try {
      await emailService.verify_email('test_expired');
    } catch (e) {
      assert.equal(e.code, emailService.ERR_CODE.EMAIL_VERIFY_EXPIRED);
    }
  });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
