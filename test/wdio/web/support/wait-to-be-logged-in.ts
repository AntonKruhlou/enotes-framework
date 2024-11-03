import { homePage } from '../pages/app/home/home-page';
import { timeouts } from '../../configs/timeouts-conf';

export const waitToBeLoggedIn = async (): Promise<void> => {
  try {
    await browser.waitUntil(
      async () => {
        return homePage.isOpened();
      },
      { timeout: timeouts.login },
    );
  } catch (e: any) {
    throw new Error(`Member is not logged in. ${e.message}`);
  }
};
