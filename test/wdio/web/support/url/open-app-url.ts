import { getBaseUrl } from './get-base-url';
import { Urls } from '../../../configs/urls-config';

export const openAppUrl = async (url: Urls | string): Promise<void> => {
  await browser.url(`${getBaseUrl()}${url}`);
};
