import { getEnvConfig } from '../../../../config/envs-config';

export const getBaseUrl = (): string => {
  return getEnvConfig().client;
};
