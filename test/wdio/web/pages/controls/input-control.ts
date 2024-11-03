import { ElementControl } from './element-control';
import { assertTrue } from '../../../support/assert/assert-true';
import { assertFalse } from '../../../support/assert/assert-false';
import { timeouts } from '../../../configs/timeouts-conf';
import { whileDo } from '../../../support/while-do';

export class InputControl extends ElementControl {
  protected async getValidationEl(): Promise<ElementControl> {
    const nextToInputParent = await (await (await this.getEl()).parentElement()).nextElement();

    return new ElementControl(nextToInputParent.$('div'));
  }

  public async setValue(value: string): Promise<void> {
    await this.scrollIntoView();
    await this.clearValue();
    await (await this.getEl()).addValue(value);
  }

  public async addValue(value: string): Promise<void> {
    await this.scrollIntoView();
    await (await this.getEl()).addValue(value);
  }

  public async uploadDocument(filePath: string): Promise<void> {
    const selector = (await this.getEl()).selector.toString();

    const remoteFilePath = await browser.uploadFile(filePath);

    await browser.execute(async (s: string) => {
      const uploadElement: HTMLElement | null = document.querySelector(s);

      if (uploadElement) {
        uploadElement.style.display = 'block';
      }
    }, selector);

    await this.waitForDisplayed({
      timeout: timeouts.medium,
      timeoutMsg: 'Upload document input is not visible',
    });

    await this.scrollIntoView();
    await (await this.getEl()).setValue(remoteFilePath);
  }

  public async clearValue(): Promise<void> {
    await whileDo(
      async () => !!(await this.getValue()),
      async () => {
        const length = (await this.getValue()).length;
        // this is needed to avoid "socket hang" up error
        const count = length > 10 ? 10 : length;

        await this.click();
        await browser.keys('End');

        const commands = [];

        for (let i = 0; i < count; i++) {
          commands.push(browser.keys(['Backspace']));
        }

        await Promise.all(commands);
      },
    );
  }

  public async clearByLength(clearLength: number): Promise<void> {
    await this.click();

    const commands = [];

    for (let i = 0; i <= clearLength; i++) {
      commands.push(browser.keys(['Backspace']));
    }

    await Promise.all(commands);
  }

  public async checkHasValue(value: string): Promise<void> {
    await this.expectToHaveAttr('value', value);
  }

  public async checkHasValueContaining(value: string): Promise<void> {
    await this.expectToHaveAttrContaining('value', value);
  }

  public async checkIsReadonly(): Promise<void> {
    assertTrue(await this.hasAttribute('readonly'), 'Input is not readonly');
  }

  public async checkIsEmpty(options?: { reverse: boolean }): Promise<void> {
    if (options?.reverse) {
      assertFalse(await this.isEmpty(), 'Input is empty');
    } else {
      assertTrue(await this.isEmpty(), 'Input is not empty');
    }
  }

  public async isEmpty(): Promise<boolean> {
    return (await this.getValue()) === '';
  }

  public async waitForValidation(timeout: number, validationMsg: string): Promise<void> {
    const validationEl = await this.getValidationEl();

    await validationEl.waitForDisplayed({ timeout });
    await validationEl.expectToHaveText(validationMsg);
  }

  public async waitIsEmpty(timeout: number, options?: { reverse: true }): Promise<void> {
    if (options?.reverse) {
      await browser.waitUntil(async () => !(await this.isEmpty()), { timeout });
    } else {
      await browser.waitUntil(async () => this.isEmpty(), { timeout });
    }
  }
}
