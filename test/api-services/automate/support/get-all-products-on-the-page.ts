import { automateService, Product } from '../automate-service';

export const getAllProductsOnThePage = async (pageNumber: number): Promise<Array<Product>> => {
  return (await automateService.getProductsData(pageNumber)).products;
};
