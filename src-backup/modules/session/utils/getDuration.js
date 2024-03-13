const handleDuration = duration => {
  if (duration) {
    if (duration < 60) {
      return duration + " mins";
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return hours + "h " + (minutes > 0 ? minutes + "mins" : "");
    }
  } else {
    return "-";
  }
};

export const getDuration = duration => {
  if (duration) {
    let arr = duration.split("-");
    if (arr[arr.length - 1] === 0 || arr[arr.length - 1] === "0") {
      return "-";
    } else {
      const durationFormate = handleDuration(arr[arr.length - 1]);
      return durationFormate;
    }
  } else {
    return `-`;
  }
};
