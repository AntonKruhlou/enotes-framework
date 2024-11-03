import { isEmpty } from '../../../support/is-empty';
import { supportService } from '../support-service';

const members: { [key: string]: { token: string } } = {};

const _getCsrfToken = async (): Promise<string> => {
  const html = await supportService.getHomePageHtml();

  const match = html.match(/<meta name="csrf-token" content="([^"]+)"/);

  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error('Could not get csrf token');
  }
};

// Token is cached to avoid redundant request on each API call
export const getCsrfToken = async (data: { login: string; password: string }): Promise<string> => {
  const key = JSON.stringify(data);

  if (isEmpty(members[key])) {
    members[key] = {} as any;
    members[key].token = await _getCsrfToken();
  }

  return members[key].token;
};
