import { ApiServiceAbstract } from '../api-service-abstract';
import { getEnvConfig } from '../../config/envs-config';
import { AxiosRequestConfig } from 'axios';

const getCommonHeaders = async (): Promise<{}> => {
  const cookies = await browser.getAllCookies();
  const sessId = cookies.find((el) => el.name === 'PHPSESSID')?.value;
  const _csrf = cookies.find((el) => el.name === '_csrf')?.value;

  return {
    cookie: `PHPSESSID=${sessId}; _csrf=${_csrf}`,
  };
};

export class SupportService extends ApiServiceAbstract {
  protected baseUrl = `${getEnvConfig().api}`;

  protected async call(config: AxiosRequestConfig): Promise<any> {
    config.headers = await getCommonHeaders();

    return super.call(config);
  }

  public async getHomePageHtml(): Promise<any> {
    const url = `${this.baseUrl}`;
    const headers = await getCommonHeaders();

    return (await this.call({ method: 'GET', url, headers })).data;
  }
}

export const supportService = new SupportService();
