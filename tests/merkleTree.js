const merkleTreeUtil = require('../karatdao_backend/util/merkletree');
const { ethers } = require('ethers');

(async function () {
  // 1 - 99 nodes trees
  for (let i = 0; i < 100; i++) examNTreeProofs(i);

  // 10000 nodes tree
  examNTreeProofs(10000);

  process.exit(1);
})();

function examNTreeProofs(n) {
  let list = [];
  for (let i = 0; i < n; i++) {
    list.push({ address: ethers.Wallet.createRandom().address, amount: 10 });
  }
  let merkleTree = merkleTreeUtil.createMerkleTree(list);
  let leaves = merkleTree.getLeaves();
  let proofs = merkleTreeUtil.getHexProofs(merkleTree);

  for (let i = 0; i < leaves.length; i++) {
    let leaf = leaves[i];
    let originalProof = merkleTree.getHexProof(leaf);
    let mooreProof = proofs[i];
    if (!equals(originalProof, mooreProof)) console.log('Failed: tree' + n);
  }

  // console.log('Passed: tree' + n);
}

function equals(proof1, proof2) {
  if (proof1.length != proof2.length) return false;

  for (let i = 0; i < proof1.length; i++) {
    if (proof1[i] != proof2[i]) return false;
  }
  return true;
}
