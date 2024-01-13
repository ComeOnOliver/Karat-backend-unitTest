const tokenService = require('../../../karatdao_backend/rewarddao/service/token');

const map0 = {};

const map1 = {
  '0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F': {
    amount: 10,
  },
  '0xb7D15753D3F76e7C892B63db6b4729f700C01298': {
    amount: 10,
  },
  '0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68': {
    amount: 10,
  },
  '0xa8532aAa27E9f7c3a96d754674c99F1E2f824810': {
    amount: 10,
  },
};

const map2 = {
  '0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F': {
    amount: 10,
  },
  '0xb7D15753D3F76e7C892B63db6b4729f700C01298': {
    amount: 10,
  },
  '0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90': {
    amount: 10,
  },
  '0xa8532aAa27E9f7c3a96d754674c99F1E2f824800': {
    amount: 10,
  },
};

const map3 = {
  '0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31': {
    amount: 10,
  },
  '0xa8532aAa27E9f7c3a96d754674c99F1E2f824800': {
    amount: 10,
  },
};

function test_operate_redundant_union() {
  let res1 = tokenService.operate_redundant_union(map0, map3);
  if (Object.keys(res1).length != 2) return false;
  if (
    !res1['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'] ||
    res1['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'].amount != 10
  ) {
    return false;
  }
  if (
    !res1['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'] ||
    res1['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'].amount != 10
  ) {
    return false;
  }

  let res2 = tokenService.operate_redundant_union(map1, map2);
  if (Object.keys(res2).length != 6) return false;
  if (
    !res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'] ||
    res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'] ||
    res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xb7D15753D3F76e7C892B63db6b4729f700C01298'] ||
    res2['0xb7D15753D3F76e7C892B63db6b4729f700C01298'].amount != 20
  ) {
    return false;
  }
  if (
    !res2['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'] ||
    res2['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'].amount != 20
  ) {
    return false;
  }
  if (
    !res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'] ||
    res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'] ||
    res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'].amount != 10
  ) {
    return false;
  }

  let res3 = tokenService.operate_redundant_union(res2, map3);
  if (Object.keys(res3).length != 7) return false;
  if (
    !res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'] ||
    res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'].amount != 20
  ) {
    return false;
  }
  if (
    !res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'] ||
    res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xb7D15753D3F76e7C892B63db6b4729f700C01298'] ||
    res3['0xb7D15753D3F76e7C892B63db6b4729f700C01298'].amount != 20
  ) {
    return false;
  }
  if (
    !res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'] ||
    res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'].amount != 20
  ) {
    return false;
  }
  if (
    !res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'] ||
    res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'] ||
    res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'] ||
    res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'].amount != 10
  ) {
    return false;
  }

  return true;
}

function test_operate_or() {
  let res1 = tokenService.operate_or(map0, map3);
  if (Object.keys(res1).length != 2) return false;
  if (
    !res1['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'] ||
    res1['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'].amount != 10
  ) {
    return false;
  }
  if (
    !res1['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'] ||
    res1['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'].amount != 10
  ) {
    return false;
  }

  let res2 = tokenService.operate_or(map1, map2);
  if (Object.keys(res2).length != 6) return false;
  if (
    !res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'] ||
    res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'] ||
    res2['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xb7D15753D3F76e7C892B63db6b4729f700C01298'] ||
    res2['0xb7D15753D3F76e7C892B63db6b4729f700C01298'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'] ||
    res2['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'] ||
    res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'] ||
    res2['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'].amount != 10
  ) {
    return false;
  }

  let res3 = tokenService.operate_or(res2, map3);
  if (Object.keys(res3).length != 7) return false;
  if (
    !res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'] ||
    res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824800'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'] ||
    res3['0xa8532aAa27E9f7c3a96d754674c99F1E2f824810'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xb7D15753D3F76e7C892B63db6b4729f700C01298'] ||
    res3['0xb7D15753D3F76e7C892B63db6b4729f700C01298'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'] ||
    res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'] ||
    res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'] ||
    res3['0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A90'].amount != 10
  ) {
    return false;
  }
  if (
    !res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'] ||
    res3['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F31'].amount != 10
  ) {
    return false;
  }

  return true;
}

function test_operate_and() {
  let res1 = tokenService.operate_and(map0, map1);
  if (Object.keys(res1).length != 0) return false;

  let res2 = tokenService.operate_and(map1, map2);
  if (Object.keys(res2).length != 2) return false;
  if (
    !res2['0xb7D15753D3F76e7C892B63db6b4729f700C01298'] ||
    res2['0xb7D15753D3F76e7C892B63db6b4729f700C01298'].amount != 10
  ) {
    return false;
  }
  if (
    !res2['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'] ||
    res2['0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F'].amount != 10
  ) {
    return false;
  }

  let res3 = tokenService.operate_and(res2, map3);
  if (Object.keys(res3).length != 0) return false;

  return true;
}

exports.run = async () => {
  let res1 = test_operate_redundant_union();
  if (!res1) {
    console.log('Failed: operate_redundant_union');
  }
  let res2 = test_operate_or();
  if (!res2) {
    console.log('Failed: operate_redundant_or');
  }
  let res3 = test_operate_and();
  if (!res3) {
    console.log('Failed: operate_redundant_and');
  }

  console.log('pass: create_campaign - logic');
};
