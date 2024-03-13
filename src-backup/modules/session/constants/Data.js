import {
  Continue,
  MarkIcon,
  NextActivity,
  delete_icon,
  eye,
  // preview,
  repeat,
} from "constants/images";

export const Data = [
  {
    id: 1,
    topic: "Primary 3 > Fractions and fractions",
    color: "#009688",
    percent: 31,
  },
  {
    id: 2,
    topic: "Primary 3 > Division",
    color: "#5E547A",
    percent: 29,
  },
  {
    id: 3,
    topic: "Primary 3 > Algebra",
    color: "#E68A2E",
    percent: 18,
  },
  {
    id: 4,
    topic: "Primary 3 > Addition",
    color: "#A9BFE9",
    percent: 12,
  },
  {
    id: 5,
    topic: "Others",
    color: "#D83D59",
    percent: 10,
  },
];

export const overLayCompleteData = {
  PREVIEW: {
    id: 1,
    name: "Preview",
    icon: eye,
  },
  CONTINUE: {
    id: 2,
    name: "Continue",
    icon: Continue,
  },

  REPEAT: {
    id: 3,
    name: "Repeat",
    icon: repeat,
  },

  ADD_NEXT_ACTIVITY: {
    id: 4,
    name: "Add next activity",
    icon: NextActivity,
  },
  NEXT_ACTIVITY: {
    id: 5,
    name: "Next activity",
    icon: NextActivity,
  },

  DELETE: {
    id: 6,
    name: "Delete",
    icon: delete_icon,
  },
  MARK: {
    id: 7,
    name: "Mark",
    icon: MarkIcon,
  },
};
export const TabTitle = [
  {
    id: 1,
    name: "Lesson Plan",
    count: false,
  },
  {
    id: 2,
    name: "Homework",
    count: false,
  },
  {
    id: 3,
    name: "Previous Session",
    count: false,
  },
  {
    id: 4,
    name: "Students",
    count: true,
  },
];
export const subjectIdArray = [
  {
    id: 1,
    subject: "English",
    object: `english_question`,
  },
  {
    id: 2,
    subject: "Maths",
    object: `question`,
  },
  {
    id: 3,
    subject: "Others",
    object: `question`,
  },
];
export const subjectPartArray = [
  {
    id: 1,
    subject: "English",
    object: `english_question_parts`,
  },
  {
    id: 2,
    subject: "Maths",
    object: `question_parts`,
  },
  {
    id: 3,
    subject: "Others",
    object: `question_parts`,
  },
];

export const studentStatus = {
  UPCOMING: { name: "upcoming", color: "#5B51FF" },
  ONGOING: { name: "ongoing", color: "#EA580C" },
  ATTENDED: { name: "attended", color: "#65a30d" },
  MISSED: { name: "missed", color: "#d83d59" },
  CANCEL: { name: "cancel", color: "#c4c4c4" },
};
export const student = {
  NOTES: "Notes",
  REPORT: "Report",
  CONTACT: "Contact",
};
