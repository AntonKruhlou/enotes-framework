import chai from 'chai';

const chaiExpect = chai.expect;

export const assertTrue = (condition: boolean, message: string): void => {
  try {
    // eslint-disable-next-line no-unused-expressions
    chaiExpect(condition).to.be.true;
  } catch (e) {
    throw new Error(`${message}: ${e}`);
  }
};
