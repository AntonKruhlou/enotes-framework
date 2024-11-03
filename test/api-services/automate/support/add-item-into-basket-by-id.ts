import { automateService } from '../automate-service';

export const addItemIntoBasketById = async (data: { id: number; amount: number }): Promise<any> => {
  const { id, amount: count } = data;
  const product = id - 1;

  return automateService.addItemIntoBasket({ product, count });
};
