import { timeouts } from '../../../../configs/timeouts-conf';
import { PageAbstract } from '../../page-abstract';

class BasketPage extends PageAbstract {
  constructor() {
    super('h1=Basket', {
      waitForTimeout: timeouts.small,
    });
  }
}

export const basketPage = new BasketPage();
