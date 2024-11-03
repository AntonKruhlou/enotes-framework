import { automateService } from '../automate-service';

export const clearBasket = async (): Promise<any> => {
  return automateService.clearBasket();
};
