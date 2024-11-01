import ShortUniqueId from 'short-unique-id';

export const uid = (length: number) => {
  const shortID = new ShortUniqueId({
    dictionary: [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3',
      '4', '5', '6', '7',
      '8', '9'
    ], length
  });

  return shortID.toString();
}

export const stringForOrderForm = (length: number = 1) => {
  const shortID = new ShortUniqueId({
    dictionary: [
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ], length
  });

  return shortID.toString();
}