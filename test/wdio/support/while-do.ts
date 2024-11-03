import dayjs from 'dayjs';
import { timeouts } from '../configs/timeouts-conf';

export const whileDo = async (
  condition: () => Promise<boolean> | boolean,
  cb: () => Promise<any>,
  options?: {
    timeout?: number;
    timeoutMsg?: string;
  },
): Promise<void> => {
  const date = dayjs().add(options?.timeout || timeouts.medium, 'milliseconds');

  let success = true;

  while (await condition()) {
    if (dayjs() > date) {
      success = false;
      break;
    }

    await cb();
  }

  if (!success) {
    throw new Error(options?.timeoutMsg || 'While do loop was not successful');
  }
};
