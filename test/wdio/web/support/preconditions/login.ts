import { Member } from '../../../../config/members-conf';
import { waitToBeLoggedIn } from '../wait-to-be-logged-in';
import { loginPage } from '../../pages/app/login/login-page';

let firstTest = true;

const doPreLoginSteps = async (member: Member): Promise<void> => {
  const { login, password } = member;

  if (!firstTest) {
    await browser.reloadSession();
  }

  firstTest = false;

  await loginPage.open();
  await loginPage.fillFormAndProceed({ login, password });
};

export const login = async (member: Member): Promise<void> => {
  await doPreLoginSteps(member);
  await waitToBeLoggedIn();
};
