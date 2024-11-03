import { automateService } from '../automate-service';

export const getAllPagesNumber = async (): Promise<any> => {
  return (await automateService.getProductsData(1)).pages;
};
