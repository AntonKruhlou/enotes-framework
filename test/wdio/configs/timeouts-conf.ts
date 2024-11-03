const MULTIPLIER = 1;

export const timeouts = {
  smallest: MULTIPLIER * 1.2 * 1000,
  beforeClick: 1.5 * 1000,
  small: MULTIPLIER * 3.75 * 1000,
  medium: MULTIPLIER * 7.5 * 1000,
  large: MULTIPLIER * 15 * 1000,
  largest: MULTIPLIER * 30 * 1000,
  scroll: 45 * 1000,
  login: MULTIPLIER * 50 * 1000,
  testDefault: MULTIPLIER * 125 * 1000,
  huge: MULTIPLIER * 250 * 1000,
};
