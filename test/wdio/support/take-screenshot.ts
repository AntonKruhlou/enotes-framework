export const takeScreenshot = async (): Promise<string> => {
  let screenshot: string;

  screenshot = await browser.takeScreenshot();

  return screenshot;
};
