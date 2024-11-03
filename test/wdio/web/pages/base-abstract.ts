import { ElementControl } from './controls/element-control';
import { timeouts } from '../../configs/timeouts-conf';
import { isAnyElementDisplayed } from '../../support/is-any-element-displayed';

/**
 * Popups and Steps should be extended from this class
 * Pages should be extended from PageAbstract class
 */
export class BaseAbstract {
  protected waitForTimeout: number;

  constructor(
    private requiredElementLocator: string,
    options?: { waitForTimeout?: number },
  ) {
    this.waitForTimeout = options?.waitForTimeout || timeouts.small;
  }

  protected getRequiredElement(): ElementControl {
    return new ElementControl($(this.requiredElementLocator));
  }

  public async isOpened(elements?: Array<ElementControl>): Promise<boolean> {
    return elements ? isAnyElementDisplayed(elements) : this.getRequiredElement().isDisplayed();
  }

  public async waitFor(timeout?: number, reverse?: true): Promise<void> {
    const timeoutMsg = `Required element at ${this.constructor.name} is ${
      reverse ? 'still' : 'not'
    } displayed`;

    await this.getRequiredElement().waitForDisplayed({
      timeout: timeout || this.waitForTimeout,
      timeoutMsg,
      reverse,
    });
  }
}
