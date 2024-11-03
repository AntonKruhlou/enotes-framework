import { Product } from '../automate-service';
import { addItemIntoBasketById } from './add-item-into-basket-by-id';
import { getAllPagesNumber } from './get-all-pages-number';
import { getAllProductsOnThePage } from './get-all-products-on-the-page';

export const addUniqueItemsIntoBasketAndGetHolePrice = async (data: {
  discount: boolean;
  amountOfItems: number;
}): Promise<number> => {
  const { discount, amountOfItems } = data;
  let totalItemsPrice: number;
  let count: number;
  let products: Array<Product>;
  totalItemsPrice = 0;
  count = 0;

  let stop = false;
  if (discount) {
    for (let i = 1; i <= (await getAllPagesNumber()) && !stop; i++) {
      products = await getAllProductsOnThePage(i);

      for (let j = 0; j < products.length; j++) {
        if (products[j].discount > 0) {
          await addItemIntoBasketById({ id: products[j].id, amount: 1 });
          totalItemsPrice += products[j].price;
          count++;
          if (count === amountOfItems) {
            stop = true;
            break;
          }
        }
      }
    }
  } else {
    for (let i = 1; i <= (await getAllPagesNumber()) && !stop; i++) {
      products = await getAllProductsOnThePage(i);

      for (let j = 0; j < products.length; j++) {
        if (products[j].discount === 0) {
          await addItemIntoBasketById({ id: products[j].id, amount: 1 });
          totalItemsPrice += products[j].price;
          count++;
          if (count === amountOfItems) {
            stop = true;
            break;
          }
        }
      }
    }
  }

  return totalItemsPrice;
};
