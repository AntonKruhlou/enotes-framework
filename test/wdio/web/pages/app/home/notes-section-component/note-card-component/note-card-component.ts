import { ComponentAbstract } from '../../../../component-abstract';
import { ButtonControl } from '../../../../controls/button-control';
import { ElementControl } from '../../../../controls/element-control';
import { InputControl } from '../../../../controls/input-control';

export class NoteCardComponent extends ComponentAbstract {
  protected get input(): InputControl {
    return new InputControl(this.getChild('//input[@name="product-enter-count"]'));
  }

  protected get buyButton(): ButtonControl {
    return new ButtonControl(this.getChild('//button[contains(@class,"actionBuyProduct")]'));
  }

  protected get productName(): ElementControl {
    return new ElementControl(this.getChild('//div[contains(@class,"product_name")]'));
  }

  protected get productPrice(): ElementControl {
    return new ElementControl(this.getChild('//*[contains(@class,"product_price")]'));
  }

  public async clickBuyButton(): Promise<void> {
    await this.buyButton.click();
  }

  public async getProductName(): Promise<string> {
    return this.productName.getText();
  }

  public async getProductPrice(): Promise<string> {
    return this.productPrice.getText();
  }

  public async setNumber(number: string): Promise<void> {
    await this.input.setValue(number);
  }
}
