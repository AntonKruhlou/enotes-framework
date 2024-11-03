import { ElementControl } from '../web/pages/controls/element-control';

export const isAnyElementDisplayed = async (elements: Array<ElementControl>): Promise<boolean> => {
  return (await Promise.all(elements.map(async (el: ElementControl) => el.isDisplayed()))).includes(
    true,
  );
};
