import { addUniqueItemsIntoBasketAndGetHolePrice } from '../../../../../api-services/automate/support/add-unique-items-into-basket-and-get-hole-price';
import { clearBasket } from '../../../../../api-services/automate/support/clear-basket';
import { getMembersConfig } from '../../../../../config/members-conf';
import { getRandomNumber } from '../../../../../support/get-random-number';
import { assertEqual } from '../../../../support/assert/assert-equal';
import { basketPage } from '../../../pages/app/basket/basket-page';
import { BasketItemComponent } from '../../../pages/app/components/basket-item-component';
import { headerComponent } from '../../../pages/app/components/header-component';
import { homePage } from '../../../pages/app/home/home-page';
import { NoteCardComponent } from '../../../pages/app/home/notes-section-component/note-card-component/note-card-component';
import { basketPopup } from '../../../pages/app/popups/basket-popup';
import { login } from '../../../support/preconditions/login';
import { addUniqueProductsAndGetHolePrice } from './support/add-unique-items-and-get-hole-price';

describe('Basket Тест', () => {
  const member = getMembersConfig().default;
  let card: NoteCardComponent;
  let basketItem: BasketItemComponent;
  let cardProductName: string;
  let cardProductPrice: number | string;
  let productsTotalPrice: number;

  before(async () => {
    await login(member);
  });

  beforeEach(async () => {
    // using API
    await clearBasket();
  });

  it('1. Переход в пустую корзину', async () => {
    await homePage.open();

    await headerComponent.waitFor();
    await headerComponent.waitForItemsAmountInBasket(0);
    await headerComponent.clickBasketIcon();

    await basketPopup.waitFor();
    await basketPopup.clickGoToBasketButton();

    // includes url checking and waiting for element
    await basketPage.waitFor();
  });

  it('2. Переход в корзину с 1 неакционным товаром', async () => {
    const cardIndex = 0;

    await homePage.open();
    await homePage.notesSection.waitFor();
    await homePage.notesSection.checkCardWithoutDiscountIsDisplayed(cardIndex);
    card = homePage.notesSection.getCardWithoutDiscountByIndex(cardIndex);
    cardProductName = await card.getProductName();
    cardProductPrice = await card.getProductPrice();
    await card.clickBuyButton();

    await headerComponent.waitFor();
    await headerComponent.waitForItemsAmountInBasket(1);
    await headerComponent.clickBasketIcon();

    await basketPopup.waitFor();
    basketItem = basketPopup.getItemByName(cardProductName);
    await basketItem.waitFor();

    assertEqual(
      `- ${cardProductPrice}`,
      (await basketItem.getPriceText()).trim(),
      'card and item prices are different',
    );
    assertEqual(
      cardProductPrice.replace(/\D+/g, ''),
      await basketPopup.getTotalPrice(),
      'basket total price is not as expected',
    );

    await basketPopup.clickGoToBasketButton();

    // url checking - passed, looking and waiting for element - failed
    await basketPage.waitFor();
  });

  it('3. Переход в корзину с 1 акционным товаром', async () => {
    const cardIndex = 0;

    await homePage.open();
    await homePage.notesSection.waitFor();
    await homePage.notesSection.checkCardWithDiscountIsDisplayed(cardIndex);
    card = homePage.notesSection.getCardWithDiscountByIndex(cardIndex);
    cardProductName = await card.getProductName();
    cardProductPrice = await card.getProductPrice();
    await card.clickBuyButton();

    await headerComponent.waitFor();
    await headerComponent.waitForItemsAmountInBasket(1);
    await headerComponent.clickBasketIcon();

    await basketPopup.waitFor();
    basketItem = basketPopup.getItemByName(cardProductName);
    await basketItem.waitFor();

    assertEqual(
      `- ${cardProductPrice.replace(/(р\.).*$/, '$1')}`,
      (await basketItem.getPriceText()).trim(),
      'card and item prices are different',
    );

    assertEqual(
      cardProductPrice.split(' ')[0],
      await basketPopup.getTotalPrice(),
      'basket total price is not as expected',
    );

    await basketPopup.clickGoToBasketButton();

    // url checking - passed, looking and waiting for element - failed
    await basketPage.waitFor();
  });

  it('4. Переход в корзину с 9 разными товарами', async () => {
    const requiredAmountOfItems = 9;
    productsTotalPrice = 0;

    // using API
    productsTotalPrice += await addUniqueItemsIntoBasketAndGetHolePrice({
      discount: true,
      amountOfItems: 1,
    });

    // using UI
    productsTotalPrice += await addUniqueProductsAndGetHolePrice({
      discount: false,
      numberOfProducts: 8,
    });

    await headerComponent.waitForItemsAmountInBasket(requiredAmountOfItems);
    await headerComponent.clickBasketIcon();

    await basketPopup.waitFor();
    await basketPopup.waitForTotalPriceByNumber(productsTotalPrice);

    assertEqual(
      requiredAmountOfItems,
      await basketPopup.countItems(),
      'items amount is not as expected',
    );

    assertEqual(
      productsTotalPrice,
      +(await basketPopup.getTotalPrice()),
      'basket total price is not as expected',
    );

    basketItem = basketPopup.getItemByIndex(getRandomNumber(requiredAmountOfItems));
    await basketItem.waitFor();
    await basketItem.checkTitleIsDisplayed();
    await basketItem.checkPriceIsDisplayed();
    await basketPopup.clickGoToBasketButton();

    await basketPage.waitFor();
  });

  it('5. Переход в корзину с 9 акционными товарами одного наименования', async () => {
    const requiredAmountOfItems = 9;
    const cardIndex = 0;
    productsTotalPrice = 0;

    await homePage.open();
    await homePage.notesSection.waitFor();
    await homePage.notesSection.checkCardWithDiscountIsDisplayed(cardIndex);
    card = homePage.notesSection.getCardWithDiscountByIndex(cardIndex);
    cardProductName = await card.getProductName();
    cardProductPrice = +(await card.getProductPrice()).split(' ')[0];
    productsTotalPrice = cardProductPrice * requiredAmountOfItems;
    await card.setNumber(requiredAmountOfItems.toString());
    await card.clickBuyButton();

    await headerComponent.waitFor();
    await headerComponent.waitForItemsAmountInBasket(requiredAmountOfItems);
    await headerComponent.clickBasketIcon();

    await basketPopup.waitFor();
    await basketPopup.waitForTotalPriceByNumber(productsTotalPrice);

    assertEqual(
      productsTotalPrice,
      +(await basketPopup.getTotalPrice()),
      'basket total price is not as expected',
    );

    basketItem = basketPopup.getItemByName(cardProductName);
    await basketItem.waitFor();
    await basketItem.checkTitleIsDisplayed();
    await basketItem.checkPriceIsDisplayed();
    await basketPopup.clickGoToBasketButton();

    await basketPage.waitFor();
  });
});
