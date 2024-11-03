import { timeouts } from '../../../configs/timeouts-conf';

export const waitUrlContains = async (
  substring: string,
  options?: { timeout: number },
): Promise<void> => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes(substring), {
    timeout: options?.timeout || timeouts.medium,
    timeoutMsg: `Url does not contain ${substring}`,
  });
};
