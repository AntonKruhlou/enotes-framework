import { baseConfig } from '../../base/base';
import { specsConfig } from '../../specs';
import { caps } from './caps/caps';

exports.config = {
  ...baseConfig,
  specs: specsConfig.web,
  services: ['devtools', ['chromedriver']],
  capabilities: [caps.chrome],
};
