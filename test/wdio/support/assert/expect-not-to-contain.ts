import chai from 'chai';

const chaiExpect = chai.expect;

export const expectNotToContain = (actual: string, expected: string, message: string): void => {
  try {
    chaiExpect(actual).not.to.contain(expected, message);
  } catch (e) {
    throw new Error(`${message}: ${e}`);
  }
};
