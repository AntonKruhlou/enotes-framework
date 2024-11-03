import chai from 'chai';

const chaiExpect = chai.expect;

export const assertNotEqual = (first: any, second: any, message: string): void => {
  try {
    // eslint-disable-next-line no-unused-expressions
    chaiExpect(first).to.be.not.equal(second, message);
  } catch (e) {
    throw new Error(`${message}: ${e}`);
  }
};
