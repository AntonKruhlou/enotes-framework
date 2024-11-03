import { ElementControl } from '../../controls/element-control';
import { InputControl } from '../../controls/input-control';
import { Urls } from '../../../../configs/urls-config';
import { PageAbstract } from '../../page-abstract';

class LoginPage extends PageAbstract {
  constructor() {
    super('h1=Авторизация', {
      url: Urls.login,
    });
  }

  protected get login(): InputControl {
    return new InputControl($('#loginform-username'));
  }

  protected get password(): InputControl {
    return new InputControl($('#loginform-password'));
  }

  protected get loginButton(): ElementControl {
    return new ElementControl($('button[name="login-button"]'));
  }

  public async fillFormAndProceed(data: { login: string; password: string }): Promise<void> {
    const { login, password } = data;

    await this.login.setValue(login);
    await this.password.setValue(password);
    await this.loginButton.click();
  }
}

export const loginPage = new LoginPage();
