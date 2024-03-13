//  const stateEnum = {
//   "Less than 2 minutes": {
//     min: 0,
//     max: 2,
//   },
//   "2-5 minutes": {
//     min: 2,
//     max: 5,
//   },
//   "5-10 minutes": {
//     min: 5,
//     max: 10,
//   },
//   "10-15 minutes": {
//     min: 10,
//     max: 15,
//   },
//   "15-20 minutes": {
//     min: 15,
//     max: 20,
//   },
//   "20-30 minutes": {
//     min: 20,
//     max: 30,
//   },
//   "30-60 minutes": {
//     min: 30,
//     max: 60,
//   },
// };

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
