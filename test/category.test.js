const categoryService = require('../karatdao_backend/rewarddao/service/category');
const assert = require('assert');

describe('get_category_callback', function () {
  it('get all categories correctly', async function () {
    let result1 = await categoryService.get_all_categories();
    //assert.deepEqual(res, claim_info_modified);
    assert.ok(
      result1.length !== null &&
        result1.includes('Decentralized Finance (DeFi)') &&
        Array.isArray(result1)
    );
  });

  it('get all categories with tokens correctly', async function () {
    let result2 = await categoryService.get_all_categories_with_tokens();
    assert.ok(result2.length !== null && typeof result2 === 'object');
  });

  it('get category correctly', async function () {
    let category = await categoryService.get_category(
      'Decentralized Finance (DeFi)'
    );
    let tokens_name = [];
    for (let i = 0; i < category.length; i++) {
      tokens_name.push(category[i].name);
    }
    let example = 'Uniswap';
    assert.ok(category.length !== null && tokens_name.includes(example));
  });
});
