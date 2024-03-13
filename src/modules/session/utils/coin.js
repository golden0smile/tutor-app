export const combineRanges = input => {
  if (input === undefined) {
    input = [];
  }
  let minSum = 0;
  let maxSum = 0;

  // Calculate the sum of minimum and maximum values
  for (const rangeString of input) {
    const [min, max] = rangeString.split("-").map(Number);
    minSum += min;
    maxSum += max;
  }

  // Create the resulting string
  const result = `${minSum}-${maxSum}`;

  return result;
};
