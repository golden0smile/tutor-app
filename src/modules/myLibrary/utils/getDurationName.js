export const myLibraryDuration = [
  {
    label: "Less than 2 minutes",
    value: "Less than 2 minutes",
    id: "0-2",
  },
  {
    label: "2-5 minutes",
    value: "2-5 minutes",
    id: "2-5",
  },
  {
    label: "5-10 minutes",
    value: "5-10 minutes",
    id: "5-10",
  },
  {
    label: "10-15 minutes",
    value: "10-15 minutes",
    id: "10-15",
  },
  {
    label: "15-20 minutes",
    value: "15-20 minutes",
    id: "15-20",
  },
  {
    label: "20-30 minutes",
    value: "20-30 minutes",
    id: "20-30",
  },
  {
    label: "30-60 minutes",
    value: "30-60 minutes",
    id: "30-60",
  },
];

export const getDurationName = value => {
  return myLibraryDuration.find(x => x.id === value);
};
