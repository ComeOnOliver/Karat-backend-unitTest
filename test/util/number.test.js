/**
 * number unit test
 */
 const assert = require('assert');
 const number = require('../../karatdao_backend/util/number');
 
 describe('number unit test', function () {
 
   it('test method generateSnowflakeId', async () => {
    let id = number.generateSnowflakeId();
    console.log(id);
   });
 
 
   after(async function () {
     console.log('test finished');
     process.exit();
   });
 });
 