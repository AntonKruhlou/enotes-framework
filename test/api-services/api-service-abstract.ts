import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { addTimestamp } from '../support/add-timestamp';
import { logger } from '../support/logger/logger';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.info(addTimestamp(`${response.config.method?.toUpperCase()} ${response.config.url}`));

    return response;
  },
  (error: AxiosError) => {
    logger.error(addTimestamp(`${error.config?.method?.toUpperCase()} ${error.config?.url}`));
    logger.error(error.message);

    return Promise.reject(error);
  },
);

export class ApiServiceAbstract {
  protected async call(config: AxiosRequestConfig): Promise<any> {
    return axios({
      httpsAgent,
      ...config,
    });
  }
}
