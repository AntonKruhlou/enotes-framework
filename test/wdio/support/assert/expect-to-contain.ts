import chai from 'chai';

const chaiExpect = chai.expect;

export const expectToContain = (actual: string, expected: string, message: string): void => {
  try {
    chaiExpect(actual).to.contain(expected, message);
  } catch (e: any) {
    throw new Error(`${message}. Original error: ${e.message}`);
  }
};
