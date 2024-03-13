import getExpectedCoinsForActivity from "./getExpectedCoinsForActivity";

const getExpectedCoinsForLesson = activityArray => {
  let coinsCount = 0;
  if (Array?.isArray(activityArray)) {
    activityArray?.map((item, key) => {
      coinsCount =
        coinsCount + getExpectedCoinsForActivity(item?.LessonActivityQuestions);
    });
  }

  return +coinsCount;
};
export default getExpectedCoinsForLesson;
