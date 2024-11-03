import { getCurrentEnv } from '../support/get-current-env';

enum Env {
  dev = 'dev',
  stage = 'stage',
}

const envs: any = {
  [Env.dev]: {
    client: '',
    admin: '',
    api: '',
  },
  [Env.stage]: {
    client: 'https://enotes.pointschool.ru',
    admin: '',
    api: 'https://enotes.pointschool.ru',
  },
};

export const getEnvConfig = (): any => {
  return envs[getCurrentEnv()];
};
