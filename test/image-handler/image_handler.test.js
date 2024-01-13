const imageController = require('../../karatdao_backend/controller/image');
const assert = require('assert');
const axios = require('axios');
const fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
const probe = require('probe-image-size');

describe('upload_image', function () {
  let uploads;
  this.beforeAll(async function () {
    console.log("uploading and downloading a 30+ mb image, it might take a while: ap·prox·i·mate·ly 10 to 15 seconds ")
    uploads = await imageController.upload_image({
      url: 'https://karatdao.mypinata.cloud/ipfs/Qmdm7zVSNcVyDn7XsumYgPbnXVzyA5ogUTpBx3jsdBFTJ8',
    });
  });
  it('should return an array of uploads and have 2 sizes', async function () {
    expect(uploads).to.be.an('array');
    expect(uploads).to.have.lengthOf(2);
  });
  it('should return image IPFS location', function () {
    assert.equal(
      uploads[0].Key,
      'Qmdm7zVSNcVyDn7XsumYgPbnXVzyA5ogUTpBx3jsdBFTJ8=s300'
    );
    assert.equal(
      uploads[1].Key,
      'Qmdm7zVSNcVyDn7XsumYgPbnXVzyA5ogUTpBx3jsdBFTJ8=s600'
    );
  });

  it('should return AWS correct Bucket', async function () {
    assert.equal(uploads[0].Bucket, 'image-compression-handler');
    assert.equal(uploads[1].Bucket, 'image-compression-handler');
  });

  it('should compress a 30+ mb gif', async function () {
    let result = await probe(uploads[0].Location);
    expect(result.length).to.be.below(5000000);
    let result2 = await probe(uploads[1].Location);
    expect(result2.length).to.be.below(10000000);
  });

  it('should compress to webp', async function () {
    let result = await probe(uploads[1].Location);
    let result2 = await probe(uploads[1].Location);
    expect(result.mime).to.equal('image/webp');
    expect(result2.mime).to.equal('image/webp');
  });
  it('should compres to 300 and 600 size', async function () {
    let result = await probe(uploads[0].Location);
    let result2 = await probe(uploads[1].Location);
    expect(result.width).to.equal(300);
    expect(result.height).to.equal(300);
    expect(result2.width).to.equal(600);
    expect(result2.height).to.equal(600);
  });
  it('rectangle image should be propotional', async function () {
    try {
      let result2 = await probe(
        'https://karatdao.mypinata.cloud/ipfs/QmekYJ9RmVryyXWdzRxgmLnLDrE939XjmQcqGmjFdfGQRU'
      );
      await imageController.upload_image({
        url: 'https://karatdao.mypinata.cloud/ipfs/QmekYJ9RmVryyXWdzRxgmLnLDrE939XjmQcqGmjFdfGQRU',
      });
      let result = await probe(
        'https://image-compression-handler.s3.us-west-1.amazonaws.com/QmekYJ9RmVryyXWdzRxgmLnLDrE939XjmQcqGmjFdfGQRU%3Ds300'
      );
      let width1 = result.width;
      let height1 = result.height;
      let width2 = result2.width;
      let height2 = result2.height;
      // check if the image is proportional
      // round to 2 decimal places to avoid floating point errors
      expect(Math.round((width1 / height1) * 100) / 100).to.equal(
        Math.round((width2 / height2) * 100) / 100
      );
    } catch (e) {
      console.log(e);
    }
  });

  describe('upload_nonImageFile', function () {
    it('should receive error message', async function () {
      try {
        await imageController.upload_image({
          url: 'https://karatdao.mypinata.cloud/ipfs/QmV1KN813WcWAYipnSphKoBdwzuopVKGSqjNB4tCDeAaAk',
        });
      } catch (e) {
        expect(e.toString().split('\n')[0]).to.equal(
          'ProbeError: unrecognized file format'
        );
      }
    });
  });

  describe('upload a non existent image', function () {
    it('should give a timeout error if the image non exist', async function () {
      try {
        await imageController.upload_image({
          url: 'https://karatdao.mypinata.cloud/ipfs/QmV1KN813WcWAYipnSphKoBdwzuopVKGSqjNB4tCDeAqwe',
        });
      } catch (e) {
        expect(e.toString().split('\n')[0]).to.equal(
          'Error: timeout of 10000ms exceeded'
        );
      }
    });
  });
});
