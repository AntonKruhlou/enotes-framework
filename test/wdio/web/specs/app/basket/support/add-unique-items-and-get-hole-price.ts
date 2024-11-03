import { paginationComponent } from '../../../../pages/app/components/pagination-component';
import { homePage } from '../../../../pages/app/home/home-page';
import { NoteCardComponent } from '../../../../pages/app/home/notes-section-component/note-card-component/note-card-component';

let count: number;
let totalCardsPrice: number;
let card: NoteCardComponent;
let amountOfRequiredCards: number;

const addItem = async (): Promise<void> => {
  await card.waitFor();
  totalCardsPrice += +(await card.getProductPrice()).split(' ')[0];
  await card.clickBuyButton();
  count++;
};

const findCardsWithDiscountAndAdd = async (numberOfProducts: number): Promise<void> => {
  await homePage.notesSection.waitForAnyCard();

  amountOfRequiredCards = await homePage.notesSection.countCardsWithDiscount();

  for (let i = 0; i < amountOfRequiredCards; i++) {
    card = homePage.notesSection.getCardWithDiscountByIndex(i);

    await addItem();

    if (count === numberOfProducts) {
      break;
    }
  }
};

const findCardsWithoutDiscountAndAdd = async (numberOfProducts: number): Promise<void> => {
  await homePage.notesSection.waitForAnyCard();

  amountOfRequiredCards = await homePage.notesSection.countCardsWithoutDiscount();

  for (let i = 0; i < amountOfRequiredCards; i++) {
    card = homePage.notesSection.getCardWithoutDiscountByIndex(i);

    await addItem();

    if (count === numberOfProducts) {
      break;
    }
  }
};

const switchToNextPage = async (): Promise<void> => {
  let activePageNumber = await paginationComponent.getActivePageNumber();
  await paginationComponent.clickNextAfterActivePageNumber();
  await paginationComponent.waitActivePageByNumber(activePageNumber + 1);
};

export const addUniqueProductsAndGetHolePrice = async (data: {
  discount: boolean;
  numberOfProducts: number;
}): Promise<number> => {
  const { discount, numberOfProducts } = data;
  count = 0;
  totalCardsPrice = 0;

  await homePage.open();
  await paginationComponent.clickPageNumber(1);

  if (discount) {
    await findCardsWithDiscountAndAdd(numberOfProducts);

    if (count < numberOfProducts) {
      await switchToNextPage();
      await findCardsWithDiscountAndAdd(numberOfProducts);
    }
  } else {
    await findCardsWithoutDiscountAndAdd(numberOfProducts);

    if (count < numberOfProducts) {
      await switchToNextPage();
      await findCardsWithoutDiscountAndAdd(numberOfProducts);
    }
  }

  return totalCardsPrice;
};
