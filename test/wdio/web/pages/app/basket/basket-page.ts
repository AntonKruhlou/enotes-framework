import { timeouts } from '../../../../configs/timeouts-conf';
import { Urls } from '../../../../configs/urls-config';
import { waitUrlContains } from '../../../support/url/wait-url-contains';
import { PageAbstract } from '../../page-abstract';

class BasketPage extends PageAbstract {
  constructor() {
    super('h1=Basket', {
      waitForTimeout: timeouts.small,
      url: Urls.basket,
    });
  }

  public async waitFor(): Promise<void> {
    await waitUrlContains(`${this.url}`);
    await super.waitFor();
  }
}

export const basketPage = new BasketPage();
