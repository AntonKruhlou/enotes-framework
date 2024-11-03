import { ComponentAbstract } from '../../component-abstract';
import { ElementControl } from '../../controls/element-control';

export class BasketItemComponent extends ComponentAbstract {
  protected get title(): ElementControl {
    return new ElementControl(this.getChild('//*[@class="basket-item-title"]'));
  }

  protected get price(): ElementControl {
    return new ElementControl(this.getChild('//*[@class="basket-item-price"]'));
  }

  protected get count(): ElementControl {
    return new ElementControl(this.getChild('//*[contains(@class,"basket-item-count")]'));
  }

  public async getPriceText(): Promise<string> {
    return this.price.getText();
  }

  public async getAmount(): Promise<string> {
    return this.count.getText();
  }

  public async checkTitleIsDisplayed(): Promise<void> {
    await this.title.expectToBeDisplayed();
  }

  public async checkPriceIsDisplayed(): Promise<void> {
    await this.price.expectToBeDisplayed();
  }
}
