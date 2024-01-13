import { issue, IssueData } from '../../karatdao_backend/karatdao/vcData/index';
import {
  credentialSchema,
  contractCredentialSchema,
} from '../../karatdao_backend/karatdao/vcData/schema';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';

chai.use(chaiAsPromised);

describe('vc.issue', function () {
  let issueResult = null as Awaited<ReturnType<typeof issue>> | null;
  const issueData: IssueData = {
    address: '0x0f97C506B7c3E38e487BDd5C9F381514E1f21eb9',
    category: 'discord',
    data: 'test@test.com',
  };

  before(async function () {
    issueResult = await issue(issueData);
  });

  describe('check issueData', function () {
    it('check address', async () => {
      // @ts-ignore
      await expect(issue(_.omit(issueData, 'address'))).to.be.rejectedWith(
        Error
      );
    });
    it('check data', async () => {
      // @ts-ignore
      await expect(issue(_.omit(issueData, 'data'))).to.be.rejectedWith(Error);
    });
    it('check category', async () => {
      await expect(
        issue({
          ...issueData,
          // @ts-ignore
          category: 'test',
        })
        // @ts-ignore
      ).to.be.rejectedWith(Error);
    });
  });

  describe('check issueResult', function () {
    it('check ceramic credential schema', async () => {
      const credential = issueResult!.ceramicCredential;
      const validateResult = credentialSchema.validate(credential);
      assert(
        typeof validateResult.error === 'undefined',
        validateResult.error?.stack
      );
    });

    it('check ceramic credential data', async () => {
      const credential = issueResult!.ceramicCredential;
      assert(
        credential.credentialSubject.category === issueData.category,
        'category not match'
      );
      assert(
        credential.credentialSubject.ethereumAddress === issueData.address,
        'address not match'
      );
      assert(
        credential.type.includes(issueData.category),
        'category not match'
      );
    });

    it('check contract credential schema', async () => {
      const credential = issueResult!.contractCredential;
      const validateResult = contractCredentialSchema.validate(credential);
      assert(
        typeof validateResult.error === 'undefined',
        validateResult.error?.stack
      );
    });

    it('check contract credential data', async () => {
      const credential = issueResult!.contractCredential;
      assert(
        credential.value.credentialSubject.ethereumAddress ===
          issueData.address,
        'address not match'
      );
      assert(
        credential.value.credentialSubject.vcType === issueData.category,
        'category not match'
      );
    });
  });

  after(function () {
    console.log('test finished');
    process.exit();
  });
});
