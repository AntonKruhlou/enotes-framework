import { timeouts } from '../../../../configs/timeouts-conf';
import { TElements } from '../../../../support/types/element';
import { ElementControl } from '../../controls/element-control';
import { BasketItemComponent } from '../components/basket-item-component';
import { PopupAbstract } from './popup-abstract';

class BasketPopup extends PopupAbstract {
  constructor() {
    super('[aria-labelledby="dropdownBasket"]');
  }

  protected get goToBasketButton(): ElementControl {
    return new ElementControl($('//a[@href="/basket"][text()="Перейти в корзину"]'));
  }

  protected get clearBasketButton(): ElementControl {
    return new ElementControl($('//a[@role="button"][text()="Очистить корзину"]'));
  }

  protected get totalPrice(): ElementControl {
    return new ElementControl($('//*[@class="basket_price"]'));
  }

  protected getTotalPriceByNumber(number: number): ElementControl {
    return new ElementControl($(`//*[@class="basket_price"][text()="${number}"]`));
  }

  protected async getAllItems(): Promise<TElements> {
    return $$('//li[contains(@class,"basket-item")]');
  }

  public getItemByName(name: string): BasketItemComponent {
    return new BasketItemComponent(
      `//li[contains(@class,"basket-item")][.//*[@class="basket-item-title"][text()="${name}"]]`,
    );
  }

  public getItemByIndex(index: number): BasketItemComponent {
    return new BasketItemComponent(`(//li[contains(@class,"basket-item")])[${index}]`);
  }

  public async clickGoToBasketButton(): Promise<void> {
    await this.goToBasketButton.waitAndClick();
  }

  public async clickClearBasketButton(): Promise<void> {
    await this.clearBasketButton.waitAndClick();
  }

  public async getTotalPrice(): Promise<string> {
    return this.totalPrice.getText();
  }

  public async waitForTotalPriceByNumber(number: number): Promise<void> {
    await this.getTotalPriceByNumber(number).waitForDisplayed({ timeout: timeouts.small });
  }

  public async countItems(): Promise<number> {
    return (await this.getAllItems()).length;
  }
}

export const basketPopup = new BasketPopup();
