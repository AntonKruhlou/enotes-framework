import { Env, getCurrentEnv } from '../support/get-current-env';
import { getCurrentPlatform, Platform } from '../support/get-current-platform';
import { LowEnvMembers } from './members/interfaces/low-env-members-interface';
import { webDevConfig } from './members/web-dev';
import { webStageConfig } from './members/web-stage';

export interface Member {
  login: string;
  password: string;
}

const config = {
  [Env.dev]: {
    [Platform.web]: webDevConfig,
  },
  [Env.stage]: {
    [Platform.web]: webStageConfig,
  },
};

export const getConfig = (data: { env: Env; platform: Platform }): LowEnvMembers => {
  const { env, platform } = data;

  const envMembers = config[env][platform];

  if (envMembers) {
    return envMembers;
  } else {
    throw new Error(`Unknown config for ENV=${env} PLATFORM=${platform}`);
  }
};

export const getMembersConfig = (): LowEnvMembers => {
  const env = getCurrentEnv();
  const platform = getCurrentPlatform();

  return getConfig({ env, platform });
};
