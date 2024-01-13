let sendgird = require("../../karatdao_backend/util/sendgrid");

(async function () {
    a = await sendgird.sendVerifyEmail("sh081042@gmail.com", "http://google.com.hk");
    console.log(a)
    process.exit(1);
})();
