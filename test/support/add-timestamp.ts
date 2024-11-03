export const addTimestamp = (text: string): string => {
  return `[${new Date().toJSON()}] ${text}`;
};
