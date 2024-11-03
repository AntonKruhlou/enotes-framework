import { ElementControl } from './element-control';
import { assertTrue } from '../../../support/assert/assert-true';
import { timeouts } from '../../../configs/timeouts-conf';

export class ButtonControl extends ElementControl {
  public async click(): Promise<void> {
    await this.scrollIntoView();
    await this.waitForClickable({
      timeout: timeouts.medium,
    });
    await this.checkIsDisabled(true);
    await (await this.getEl()).click();
  }

  public async checkIsDisabled(reverse: boolean = false): Promise<void> {
    if (reverse) {
      assertTrue(!(await this.hasAttribute('disabled')), 'Button is disabled');
    } else {
      assertTrue(await this.hasAttribute('disabled'), 'Button is not disabled');
    }
  }

  public async waitForLoadingState(timeout: number, reverse: boolean = false): Promise<void> {
    if (reverse) {
      await browser.waitUntil(async () => !(await this.hasAttribute('data-loading')), {
        timeout,
        timeoutMsg: 'Loading state is still present',
      });
    } else {
      await browser.waitUntil(async () => this.hasAttribute('data-loading'), {
        timeout,
        timeoutMsg: 'Loading state did not appear',
      });
    }
  }
}
