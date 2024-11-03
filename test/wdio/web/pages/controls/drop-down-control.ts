import { ElementControl } from './element-control';
import { assertEqual } from '../../../support/assert/assert-equal';
import { assertTrue } from '../../../support/assert/assert-true';

export class DropDownControl extends ElementControl {
  public async selectByValueAttribute(valueAttribute: string | number): Promise<void> {
    await (await this.getEl()).selectByAttribute('value', valueAttribute);
  }

  public async selectByVisibleText(text: string): Promise<void> {
    await (await this.getEl()).selectByVisibleText(text);
  }

  public async checkHasOptions(options: Array<string>): Promise<void> {
    assertEqual(
      (await (await this.getEl()).$$('option')).length,
      options.length,
      'Options arr length is not as expected',
    );

    await Promise.all(
      options.map(async (option: string) => {
        assertTrue(
          await (await (await this.getEl()).$(`//option[text()="${option}"]`)).isDisplayed(),
          `Option ${option} is not displayed`,
        );
      }),
    );
  }

  public async getValue(): Promise<string> {
    return (await this.getEl()).getValue();
  }
}
