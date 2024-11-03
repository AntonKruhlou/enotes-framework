import { Env, getCurrentEnv } from './get-current-env';

export const isStage = (): boolean => {
  return getCurrentEnv() === Env.stage;
};
