import { automateService } from '../automate-service';

export enum Item {
  'Творческий беспорядок',
  'Блокнот в точку',
  'Игра престолов',
  'Кошечка Мари',
  'Нотная тетрадь',
  'Black&Red',
  'Гусь. Дедлайн',
  'Художник',
  'Enjoy The Little Things',
}

export const addItemIntoBasketByName = async (data: {
  itemName: Item;
  amount: number;
}): Promise<any> => {
  const { itemName: product, amount: count } = data;

  return automateService.addItemIntoBasket({ product, count });
};
