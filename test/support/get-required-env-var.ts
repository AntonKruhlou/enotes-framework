export const getRequiredEnvVar = (envVar: string): string => {
  const envVarValue = process.env[envVar];

  if (envVarValue && envVarValue !== '') {
    return envVarValue;
  } else {
    throw new Error(`Environment variable "${envVar}" must be set up`);
  }
};
