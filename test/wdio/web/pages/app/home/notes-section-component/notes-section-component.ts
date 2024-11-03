import { timeouts } from '../../../../../configs/timeouts-conf';
import { TElements } from '../../../../../support/types/element';
import { whileDo } from '../../../../../support/while-do';
import { ComponentAbstract } from '../../../component-abstract';
import { paginationComponent } from '../../components/pagination-component';
import { NoteCardComponent } from './note-card-component/note-card-component';

export class NotesSectionComponent extends ComponentAbstract {
  constructor() {
    super('//div[contains(@class,"note-list")]');
  }

  protected async getAllCardsWithoutDiscount(): Promise<TElements> {
    return $$(`${this.wrapperLocator}//div[@data-product][not(contains(@class,"hasDiscount"))]`);
  }

  protected async getAllCardsWithDiscount(): Promise<TElements> {
    return $$(`${this.wrapperLocator}//div[@data-product][contains(@class,"hasDiscount")]`);
  }

  public getCardByIndex(index: number): NoteCardComponent {
    return new NoteCardComponent(`(${this.wrapperLocator}//div[@data-product])[${index + 1}]`);
  }

  public getCardWithoutDiscountByIndex(index: number): NoteCardComponent {
    return new NoteCardComponent(
      `(${this.wrapperLocator}//div[@data-product][not(contains(@class,"hasDiscount"))])[${index + 1}]`,
    );
  }

  public getCardWithDiscountByIndex(index: number): NoteCardComponent {
    return new NoteCardComponent(
      `(${this.wrapperLocator}//div[@data-product][contains(@class,"hasDiscount")])[${index + 1}]`,
    );
  }

  public async checkCardWithoutDiscountIsDisplayed(index: number): Promise<void> {
    const _cardEl = this.getCardWithoutDiscountByIndex(index);

    try {
      await _cardEl.waitFor({ timeout: timeouts.smallest });
      // eslint-disable-next-line no-empty
    } catch (e) {}

    await whileDo(
      async () => !(await _cardEl.isDisplayed()),
      async () => {
        if (await paginationComponent.isNextAfterActiveNumberIsDisplayed()) {
          await paginationComponent.clickNextAfterActivePageNumber();
        }
        await browser.pause(timeouts.smallest);
      },
      {
        timeout: timeouts.scroll,
        timeoutMsg: `Could not find card by index ${index}`,
      },
    );
  }

  public async checkCardWithDiscountIsDisplayed(index: number): Promise<void> {
    const _cardEl = this.getCardWithDiscountByIndex(index);

    try {
      await _cardEl.waitFor({ timeout: timeouts.smallest });
      // eslint-disable-next-line no-empty
    } catch (e) {}

    await whileDo(
      async () => !(await _cardEl.isDisplayed()),
      async () => {
        if (await paginationComponent.isNextAfterActiveNumberIsDisplayed()) {
          await paginationComponent.clickNextAfterActivePageNumber();
        }
        await browser.pause(timeouts.smallest);
      },
      {
        timeout: timeouts.scroll,
        timeoutMsg: `Could not find card by index ${index}`,
      },
    );
  }

  public async countCardsWithoutDiscount(): Promise<number> {
    return (await this.getAllCardsWithoutDiscount()).length;
  }

  public async countCardsWithDiscount(): Promise<number> {
    return (await this.getAllCardsWithDiscount()).length;
  }

  public async waitForAnyCard(timeout?: number): Promise<void> {
    await browser.waitUntil(async () => this.getCardByIndex(0).isDisplayed(), {
      timeout: timeout ? timeout : timeouts.small,
      timeoutMsg: 'There is no any card displayed',
    });
  }
}
