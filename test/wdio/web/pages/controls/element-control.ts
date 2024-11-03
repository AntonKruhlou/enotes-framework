import { BaseControl, CustomWaitOptions } from '../../../base-control/base-control';
import { ClickOptions } from 'webdriverio/build/types';

export class ElementControl extends BaseControl {
  /**
   * Actions
   */
  public async click(options?: ClickOptions): Promise<void> {
    await (await this.getEl()).click(options);
  }

  public async waitAndClick(
    waitOptions?: CustomWaitOptions,
    options?: ClickOptions,
  ): Promise<void> {
    const element = await this.getEl();

    await element.waitForDisplayed(waitOptions);
    await element.click(options);
  }

  public async getCSSProperty(property: string): Promise<any> {
    return (await this.getEl()).getCSSProperty(property);
  }

  public async scrollIntoView(): Promise<void> {
    await (await this.getEl()).scrollIntoView();
  }

  public async waitForClickable(options: CustomWaitOptions): Promise<void> {
    await this.doWait(async (_options: CustomWaitOptions) => {
      await browser.waitUntil(async () => (await this.getEl()).isClickable(), options);
    }, options);
  }

  /**
   * Boolean
   */
  public async isClickable(): Promise<boolean> {
    return (await this.getEl()).isClickable();
  }

  public async isDisplayedInViewport(): Promise<boolean> {
    return (await this.getEl()).isDisplayedInViewport();
  }
}
