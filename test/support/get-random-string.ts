const chars: any = {
  digits: '0123456789',
  usPhoneDigits: '23456789', // 0,1 is removed for simplicity
  nonDigits: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()',
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  lettersLowercase: 'abcdefghijklmnopqrstuvwxyz',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
};

export function getRandomString(
  charsType: 'digits' | 'non-digits' | 'alphanumeric' | 'letters' | 'letters-lowercase',
  length: number,
): string {
  let result = '';

  const characters = {
    digits: chars.digits,
    usPhone: chars.usPhoneDigits,
    ['non-digits']: chars.nonDigits,
    letters: chars.letters,
    ['letters-lowercase']: chars.lettersLowercase,
    alphanumeric: chars.alphanumeric,
  }[charsType];

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
