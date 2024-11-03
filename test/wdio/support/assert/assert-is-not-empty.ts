import { assertFalse } from './assert-false';
import { isEmpty } from '../../../support/is-empty';

export const assertIsNotEmpty = (value: any, msg: string): void => {
  assertFalse(isEmpty(value), msg);
};
