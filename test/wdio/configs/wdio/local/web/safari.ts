import { baseConfig } from '../../base/base';
import { specsConfig } from '../../specs';
import { caps } from './caps/caps';

exports.config = {
  ...baseConfig,
  specs: specsConfig.web,
  path: '/',
  services: [['safaridriver', {}]],
  capabilities: [caps.safari],
};
