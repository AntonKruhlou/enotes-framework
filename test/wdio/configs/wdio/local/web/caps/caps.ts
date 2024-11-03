import { defaultLanguage, defaultLocale } from '../../../../../support/constants/capabilities';

export const caps = {
  chrome: {
    browserName: 'chrome',
    maxInstances: 3,
    'goog:chromeOptions': {
      prefs: {
        'intl.accept_languages': `${defaultLanguage}-${defaultLocale}`,
        'profile.managed_default_content_settings.popups': 1,
        'profile.managed_default_content_settings.notifications': 1,
      },
    },
  },
  safari: {
    browserName: 'safari',
    maxInstances: 1,
  },
};
