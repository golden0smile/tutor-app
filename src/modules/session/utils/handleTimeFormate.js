export const handleTimeFormate = (dateTime, isEndTime = false, Duration) => {
  const date = isEndTime ? dateTime.add(Duration, "minutes") : dateTime;

  let formatString = "ha";

  if (date.format("mm") === "00") {
    formatString = "ha";
  } else {
    formatString = "h:mma";
  }
  return dateTime.format(formatString);
};
