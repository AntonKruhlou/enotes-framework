import { ElementControl } from '../../controls/element-control';
import { ComponentAbstract } from '../../component-abstract';
import { timeouts } from '../../../../configs/timeouts-conf';

export class HeaderComponent extends ComponentAbstract {
  constructor() {
    super('//nav[contains(@class,"navbar")]');
  }

  protected get basketIcon(): ElementControl {
    return new ElementControl($('#dropdownBasket'));
  }

  protected get basketCounter(): ElementControl {
    return new ElementControl($('.basket-count-items.badge-primary'));
  }

  public async clickBasketIcon(): Promise<void> {
    await this.basketIcon.waitAndClick();
  }

  public async waitForItemsAmountInBasket(amount: number): Promise<void> {
    await this.basketCounter.waitForDisplayed({ timeout: timeouts.small });

    await browser.waitUntil(
      async () => {
        return +(await this.basketCounter.getText()) === amount;
      },
      {
        timeout: timeouts.medium,
        timeoutMsg: 'Required amount of items in basket still not displayed',
      },
    );
  }
}

export const headerComponent = new HeaderComponent();
