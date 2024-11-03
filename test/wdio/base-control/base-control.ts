import { TElement } from '../support/types/element';
import { getElementName } from './support/get-element-name';

export type CustomWaitOptions = {
  timeout: number;
  timeoutMsg?: string;
  reverse?: true;
};

export type CustomExpectOptions = {
  message?: string;
  reverse?: boolean;
};

export class BaseControl {
  protected elName: string;

  constructor(protected el: TElement | WebdriverIO.Element) {
    this.elName = getElementName();
  }

  public async getEl(): Promise<WebdriverIO.Element> {
    return this.el;
  }

  /**
   * Actions
   */
  public async getText(): Promise<string> {
    return (await this.getEl()).getText();
  }

  public async getAttribute(attributeName: string): Promise<string> {
    return (await this.getEl()).getAttribute(attributeName);
  }

  public async getValue(): Promise<string> {
    return (await this.getEl()).getValue();
  }

  /**
   * Boolean
   */
  public async isDisplayed(): Promise<boolean> {
    return (await this.getEl()).isDisplayed();
  }

  public async hasAttribute(attribute: string): Promise<boolean> {
    return (await this.getAttribute(attribute)) !== null;
  }

  /**
   * Wait
   */
  protected async doWait(
    cb: (_options: CustomWaitOptions) => Promise<void>,
    options: CustomWaitOptions,
  ): Promise<void> {
    const { timeout, timeoutMsg, reverse } = options;

    try {
      await cb({ timeout, reverse });
    } catch (e: any) {
      let error = `Original error: ${e.message}`;

      if (timeoutMsg) {
        error = `${error}. Custom error: ${timeoutMsg}`;
      }

      if (this.elName.length) {
        error = `${error}. Element name: ${this.elName}`;
      }

      throw new Error(error);
    }
  }

  public async waitForDisplayed(options: CustomWaitOptions): Promise<void> {
    await this.doWait(async (_options: CustomWaitOptions) => {
      await (await this.getEl()).waitForDisplayed(_options);
    }, options);
  }

  public async waitForEnabled(options: CustomWaitOptions): Promise<void> {
    await this.doWait(async (_options: CustomWaitOptions) => {
      await (await this.getEl()).waitForEnabled(_options);
    }, options);
  }

  public async waitToHaveText(text: string, options: CustomWaitOptions): Promise<void> {
    await browser.waitUntil(
      async () => (await (await this.getEl()).getText()).indexOf(text) > -1,
      options,
    );
  }

  public async waitToHaveAttributeValue(
    attrName: string,
    attrValue: string,
    options: {
      timeout: number;
      timeoutMsg?: string;
    },
  ): Promise<void> {
    await browser.waitUntil(async () => (await this.getAttribute(attrName)) === attrValue, options);
  }

  public async waitToHaveAttributeIncludesValue(
    attrName: string,
    attrValue: string,
    options?: {
      timeout: number;
      timeoutMsg?: string;
    },
  ): Promise<void> {
    await browser.waitUntil(
      async () => (await this.getAttribute(attrName)).includes(attrValue),
      options,
    );
  }

  public async waitToHaveAttribute(
    attrName: string,
    options: {
      timeout: number;
      timeoutMsg?: string;
    },
  ): Promise<void> {
    await browser.waitUntil(async () => (await this.getAttribute(attrName)) !== null, options);
  }

  /**
   * Expect
   */
  public async expectToBeDisplayed(options?: CustomExpectOptions): Promise<void> {
    if (options?.reverse) {
      await expect(await this.getEl()).not.toBeDisplayed(options);
    } else {
      await expect(await this.getEl()).toBeDisplayed(options);
    }
  }

  public async expectToBeDisplayedInViewport(options?: CustomExpectOptions): Promise<void> {
    if (options?.reverse) {
      await expect(await this.getEl()).not.toBeDisplayedInViewport(options);
    } else {
      await expect(await this.getEl()).toBeDisplayedInViewport(options);
    }
  }

  public async expectToBePresent(options?: CustomExpectOptions): Promise<void> {
    if (options?.reverse) {
      await expect(await this.getEl()).not.toBePresent(options);
    } else {
      await expect(await this.getEl()).toBePresent(options);
    }
  }

  public async expectToBeClickable(options?: CustomExpectOptions): Promise<void> {
    if (options?.reverse) {
      await expect(await this.getEl()).not.toBeClickable(options);
    } else {
      await expect(await this.getEl()).toBeClickable(options);
    }
  }

  public async expectToHaveAttr(
    attr: string,
    attrValue?: string,
    options?: ExpectWebdriverIO.StringOptions,
  ): Promise<void> {
    await expect(await this.getEl()).toHaveAttr(attr, attrValue, options);
  }

  public async expectNotToHaveAttr(
    attr: string,
    attrValue?: string,
    options?: ExpectWebdriverIO.StringOptions,
  ): Promise<void> {
    await expect(await this.getEl()).not.toHaveAttr(attr, attrValue, options);
  }

  public async expectToHaveText(
    text: string,
    options?: ExpectWebdriverIO.StringOptions,
  ): Promise<void> {
    await expect(await this.getEl()).toHaveText(text, options);
  }

  public async expectToHaveTextContaining(
    text: string,
    options?: ExpectWebdriverIO.StringOptions,
  ): Promise<void> {
    await expect(await this.getEl()).toHaveTextContaining(text, options);
  }

  public async expectToHaveAttrContaining(
    attr: string,
    text: string,
    options?: ExpectWebdriverIO.StringOptions,
  ): Promise<void> {
    await expect(await this.getEl()).toHaveAttrContaining(attr, text, options);
  }

  public async expectNotToHaveAttrContaining(
    attr: string,
    text: string,
    options?: ExpectWebdriverIO.StringOptions,
  ): Promise<void> {
    await expect(await this.getEl()).not.toHaveAttrContaining(attr, text, options);
  }
}
