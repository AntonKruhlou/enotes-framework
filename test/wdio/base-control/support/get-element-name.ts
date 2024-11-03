/**
 * The method is used to get an element name from stack trace in ElementControl constructor.
 * Is able to handle name for an element defined as getter.
 * Element name is used in Base Controls error messages.
 */
export const getElementName = (): string => {
  let res = '';

  const stack = new Error('').stack;

  if (stack) {
    const row = stack.split('\n').find((r) => r.indexOf('[as') > -1);

    if (row) {
      // common case
      const match = row.match(/at (.*) \[as/);

      if (match && match[1]) {
        const arr = match[1].split(' ');
        const page = arr[0].replace('.get', '');
        const elName = arr[1];

        res = `${elName.charAt(0).toUpperCase()}${elName.slice(1)} at ${page}`;
      }
    }
  }

  return res;
};
