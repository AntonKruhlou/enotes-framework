export enum KeyCode {
  enter = '\uE007',
}

export const pressKeyByCode = async (keyCode: KeyCode): Promise<void> => {
  await browser.keys(keyCode);
};
