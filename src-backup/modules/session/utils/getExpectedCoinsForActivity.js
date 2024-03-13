const getExpectedCoinsForActivity = questionArray => {
  let coinCount = 0;
  if (Array.isArray(questionArray)) {
    questionArray?.map((item, key) => {
      let coinCanEarn = item?.coins_can_earn ? +item?.coins_can_earn : 0;
      coinCount = coinCount + coinCanEarn;
    });
  }

  return +coinCount;
};
export default getExpectedCoinsForActivity;
