import { LowEnvMembers } from './interfaces/low-env-members-interface';

export const webStageConfig: LowEnvMembers = {
  default: {
    login: 'test',
    password: 'test',
  },
  forSpecialBenefits: {
    login: 'test2',
    password: 'test2',
  },
};
