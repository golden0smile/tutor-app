const getScoreStatus = currentScore => {
  let status = 0;
  currentScore = Math.floor(currentScore);
  if (currentScore >= 0 && currentScore < 30) {
    status = 3;
  } else if (currentScore >= 30 && currentScore < 70) {
    status = 2;
  } else if (currentScore >= 70 && currentScore <= 100) {
    status = 1;
  }
  return status;
};
export default getScoreStatus;
