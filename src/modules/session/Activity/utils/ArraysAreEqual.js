export const ArraysAreEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every(value => array2.includes(value));
};
