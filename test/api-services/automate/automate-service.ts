import { ApiServiceAbstract } from '../api-service-abstract';
import { getEnvConfig } from '../../config/envs-config';
import { getCsrfToken } from '../support-member/support/get-csrf-token';
import { AxiosRequestConfig } from 'axios';

export type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  discount: number;
  count: number;
  poster: string;
};

export interface ProductData {
  product: number;
  count: number;
}

const getCommonHeaders = async (): Promise<any> => {
  const cookies = await browser.getAllCookies();
  const sessId = cookies.find((el) => el.name === 'PHPSESSID')?.value;
  const csrf = cookies.find((el) => el.name === '_csrf')?.value;
  const token = await getCsrfToken({ login: 'test', password: 'test' });

  return {
    'x-csrf-token': token,
    cookie: `PHPSESSID=${sessId}; _csrf=${csrf}`,
  };
};

class AutomateService extends ApiServiceAbstract {
  protected baseUrl = `${getEnvConfig().api}`;

  protected async call(config: AxiosRequestConfig): Promise<any> {
    config.headers = await getCommonHeaders();

    return super.call(config);
  }

  public async clearBasket(): Promise<any> {
    const url = `${this.baseUrl}/basket/clear`;

    return this.call({ method: 'POST', url });
  }

  public async addItemIntoBasket(productData: ProductData): Promise<any> {
    const url = `${this.baseUrl}/basket/create`;
    const { product, count } = productData;
    const data = `product=${product + 1}&count=${count}`;

    return this.call({ method: 'POST', url, data });
  }

  public async getProductsData(pageNumber: number): Promise<any> {
    const url = `${this.baseUrl}/product/get`;
    const data = `filters=search%3D%26price-from%3D%26price-to%3D&action=&page=${pageNumber}`;

    return (await this.call({ method: 'GET', url, data })).data;
  }
}

export const automateService = new AutomateService();
