import { BaseAbstract } from './base-abstract';
import { Urls } from '../../configs/urls-config';
import { ElementControl } from './controls/element-control';
import { CustomExpectOptions, CustomWaitOptions } from '../../base-control/base-control';
import { timeouts } from '../../configs/timeouts-conf';
import { getBaseUrl } from '../support/url/get-base-url';
import { openAppUrl } from '../support/url/open-app-url';

/**
 * Pages should be extended from this class
 * Popups and Steps should be extended from BaseAbstract class
 */
export abstract class PageAbstract extends BaseAbstract {
  protected url: Urls | undefined;

  constructor(requiredElementLocator: string, options?: { url?: Urls; waitForTimeout?: number }) {
    super(requiredElementLocator, options);

    this.url = options?.url || undefined;
  }

  protected get html(): ElementControl {
    return new ElementControl($('//html'));
  }

  public async open(): Promise<void> {
    if (!this.url) {
      throw new Error('Url was not passed to the class constructor');
    }

    await openAppUrl(this.url);
    await super.waitFor(this.waitForTimeout || timeouts.large);
  }

  public async openWithParams(params: { [key: string]: string }): Promise<void> {
    if (!this.url) {
      throw new Error('Url was not passed to the class constructor');
    }

    const _url = new URL(`${getBaseUrl()}${this.url}`);

    if (params) {
      Object.keys(params).forEach((param) => {
        _url.searchParams.append(param, params[param]);
      });
    }

    await browser.url(_url.href);
    await super.waitFor(this.waitForTimeout || timeouts.large);
  }

  public async checkElementContainingTextIsDisplayed(
    text: string,
    options?: CustomExpectOptions,
  ): Promise<void> {
    await new ElementControl($(`//*[contains(text(),"${text}")]`)).expectToBeDisplayed(options);
  }

  public async waitElementContainingTextIsDisplayed(
    text: string,
    options?: CustomWaitOptions,
  ): Promise<void> {
    await new ElementControl($(`//*[contains(text(),"${text}")]`)).waitForDisplayed({
      timeout: timeouts.medium,
      ...options,
    });
  }
}
