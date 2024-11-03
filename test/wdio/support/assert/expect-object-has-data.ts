import chai from 'chai';

const chaiExpect = chai.expect;

export const expectObjectHasData = (obj: any, data: { [key: string]: any }): void => {
  for (let property of Object.keys(data)) {
    chaiExpect(obj).to.have.property(property);

    if (Object.prototype.toString.call(obj[property]) === '[object Object]') {
      expectObjectHasData(obj[property], data[property]);
    } else {
      chaiExpect(obj[property]).to.deep.equal(
        data[property],
        `Object "${property}" property value is not as expected`,
      );
    }
  }
};
