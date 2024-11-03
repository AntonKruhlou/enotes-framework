import { getRequiredEnvVar } from './get-required-env-var';

export enum Platform {
  web = 'web',
}

export const getCurrentPlatform = (): Platform => {
  const event = getRequiredEnvVar('npm_lifecycle_event');

  if (event.includes('web')) {
    return Platform.web;
  } else {
    throw new Error(
      `Could not identify platform. Environment variable npm_lifecycle_event: ${event}`,
    );
  }
};
