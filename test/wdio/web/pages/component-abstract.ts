import { ElementControl } from './controls/element-control';
import { timeouts } from '../../configs/timeouts-conf';
import { CustomExpectOptions } from '../../base-control/base-control';
import { TElement } from '../../support/types/element';

/**
 * Components with wrapper should be extended from this class
 */
export class ComponentAbstract {
  protected waitForTimeout: number;

  constructor(
    protected wrapperLocator: string,
    options?: { waitForTimeout: number },
  ) {
    this.waitForTimeout = options?.waitForTimeout || timeouts.small;
  }

  protected get wrapper(): ElementControl {
    return new ElementControl($(this.wrapperLocator));
  }

  protected getChild(locator: string): TElement {
    return $(`${this.wrapperLocator}${locator}`);
  }

  protected getChildByIndex(xpathLocator: string, index: number): TElement {
    return $(`(${this.wrapperLocator}${xpathLocator})[${index + 1}]`);
  }

  public async waitFor(options?: {
    timeout?: number;
    timeoutMsg?: string;
    reverse?: true;
  }): Promise<void> {
    await this.wrapper.waitForDisplayed({
      timeout: options?.timeout || this.waitForTimeout,
      timeoutMsg: `Wrapper at ${this.constructor.name} is ${
        options?.reverse ? 'still' : 'not'
      } displayed`,
      ...options,
    });
  }

  public async isDisplayed(): Promise<boolean> {
    return this.wrapper.isDisplayed();
  }

  public async checkIsDisplayed(options?: CustomExpectOptions): Promise<void> {
    await this.wrapper.expectToBeDisplayed(options);
  }

  public async click(): Promise<void> {
    await this.wrapper.click();
  }
}
