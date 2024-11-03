import { Env, getCurrentEnv } from './get-current-env';

export const isDev = (): boolean => {
  return getCurrentEnv() === Env.dev;
};
