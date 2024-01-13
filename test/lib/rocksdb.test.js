/**
 * rocksdb unit test
 */
const assert = require('assert');
const rocksdb = require('../../karatdao_backend/rocksdb');

const db = 'testdb';

describe('rocksdb unit test', function () {

  it('test method put', async () => {
    let num = 1000;
    for (let i = 1000; i < 1000 + num; i++) {
      await rocksdb.put(db, 'ok', i, { id: i })
    }
  });

  it('test method get', async () => {
    let uuid = 1001;
    const info = await rocksdb.get(db, 'ok', uuid);
    console.log(info);
    assert.equal(info.id, uuid);
  });

  it('test method scan', async () => {
    let num = 1000;
    const keys = await rocksdb.scan(db, 'ok');
    console.log(keys);
    assert.equal(keys.length, num);
  });

  it('test method remove', async () => {
    let num = 1000;
    let keys;
    await rocksdb.remove(db, 'ok', 1001);
    keys = await rocksdb.scan(db, 'ok');
    assert.equal(keys.length, num - 1);
  });

  after(async function () {
    console.log('test finished');
    await rocksdb.del(db);
    process.exit();
  });
});
