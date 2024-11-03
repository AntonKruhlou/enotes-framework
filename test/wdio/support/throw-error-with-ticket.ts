export const throwErrorWithTicket = async (
  bugTicket: string,
  cb: () => Promise<void> | void,
): Promise<void> => {
  try {
    await cb();
  } catch (e: any) {
    throw new Error(`Bug ticket: ${bugTicket}. Error: ${e.message}`);
  }
};
