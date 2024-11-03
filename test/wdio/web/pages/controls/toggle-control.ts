import { timeouts } from '../../../configs/timeouts-conf';
import { ElementControl } from './element-control';
import { assertFalse } from '../../../support/assert/assert-false';
import { assertTrue } from '../../../support/assert/assert-true';

export class ToggleControl extends ElementControl {
  protected async isSelected(): Promise<boolean> {
    return this.hasAttribute('data-checked');
  }

  public async checkIsSelected(options?: { reverse: true }): Promise<void> {
    if (options?.reverse) {
      assertFalse(await this.isSelected(), 'Toggle is selected');
    } else {
      assertTrue(await this.isSelected(), 'Toggle is not selected');
    }
  }

  public async select(reverse: boolean = false): Promise<void> {
    if (reverse) {
      if (await this.isSelected()) {
        await this.click();
        await browser.waitUntil(async () => !(await this.isSelected()), {
          timeout: timeouts.small,
          timeoutMsg: 'Element is still toggled',
        });
      }
    } else {
      if (!(await this.isSelected())) {
        await this.click();
        await browser.waitUntil(async () => this.isSelected(), {
          timeout: timeouts.small,
          timeoutMsg: 'Element is not toggled',
        });
      }
    }
  }
}
