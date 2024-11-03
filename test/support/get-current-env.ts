import { getRequiredEnvVar } from './get-required-env-var';

export enum Env {
  dev = 'dev',
  stage = 'stage',
}

export const getCurrentEnv = (): Env => {
  const possibleEnvs = Object.keys(Env);
  const envVar = getRequiredEnvVar('ENV').toLowerCase();

  if (possibleEnvs.indexOf(envVar) !== -1) {
    return envVar as Env;
  } else {
    throw new Error(
      `ENV=${envVar} environment variable is not allowed. Possible values: ${possibleEnvs.join(
        ' | ',
      )}`,
    );
  }
};
