import { isEmpty } from '../../../support/is-empty';
import { assertTrue } from './assert-true';

export const assertIsEmpty = (value: any, msg: string): void => {
  assertTrue(isEmpty(value), msg);
};
