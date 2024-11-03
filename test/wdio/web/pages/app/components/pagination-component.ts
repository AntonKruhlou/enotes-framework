import { timeouts } from '../../../../configs/timeouts-conf';
import { ComponentAbstract } from '../../component-abstract';
import { ButtonControl } from '../../controls/button-control';
import { ElementControl } from '../../controls/element-control';

export class PaginationComponent extends ComponentAbstract {
  constructor() {
    super('//*[@aria-label="Page navigation"]');
  }

  protected get activePageNumber(): ElementControl {
    return new ElementControl(
      this.getChild(
        '//li[contains(@class,"page-item") and contains(@class,"active")]/*[@data-page-number]',
      ),
    );
  }

  protected get nextAfterActivePageNumber(): ButtonControl {
    return new ButtonControl(
      this.getChild('//li[@class="page-item active"]/following-sibling::li'),
    );
  }

  protected getActivePageNumberByNumber(number: number): ElementControl {
    return new ElementControl(
      this.getChild(
        `//li[contains(@class,"page-item") and contains(@class,"active")]/*[@data-page-number="${number}"]`,
      ),
    );
  }

  protected getPageNumberByNumber(number: number): ElementControl {
    return new ElementControl(
      this.getChild(`//li[contains(@class,"page-item")]/*[@data-page-number="${number}"]`),
    );
  }

  public async checkNextAfterActivePageNumberIsDisabled(data?: { reverse: true }): Promise<void> {
    await this.nextAfterActivePageNumber.waitForDisplayed({ timeout: timeouts.medium });
    await this.nextAfterActivePageNumber.checkIsDisabled(data?.reverse);
  }

  public async isNextAfterActiveNumberIsDisplayed(): Promise<boolean> {
    return this.nextAfterActivePageNumber.isDisplayed();
  }

  public async clickNextAfterActivePageNumber(): Promise<void> {
    await this.nextAfterActivePageNumber.click();
  }

  public async clickPageNumber(number: number): Promise<void> {
    await this.getPageNumberByNumber(number).click();
  }

  public async getActivePageNumber(): Promise<number> {
    return +(await this.activePageNumber.getAttribute('data-page-number'));
  }

  public async waitActivePageByNumber(number: number): Promise<void> {
    await this.getActivePageNumberByNumber(number).waitForDisplayed({ timeout: timeouts.small });
  }
}

export const paginationComponent = new PaginationComponent();
