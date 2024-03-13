import { overLayCompleteData as data } from "../constants/Data";
import { handleQuestionObject } from "./handleQuestionObject";
import { handleQuestionPart } from "./handleQuestionPart";
export const getOverlayData = (
  type,
  status,
  activity_list,
  subject_id,
  activity_type,
  lessonPlan,
  editLessonPlan,
  previousPlan,
  values,
) => {
  //  type==1 ? lesson plan || type ==2 ? homework plan || type == 3 ? edit lesson plan
  // status ===1?completed:incomplete
  let overLayData = [];
  let studentAttemptCount =
    +activity_type === 0
      ? activity_list?.filter(
          item =>
            item?.[handleQuestionObject(+subject_id)]?.[
              handleQuestionPart(+subject_id)
            ]?.flatMap(x => x?.StudentAnsAttempts)?.length > 0,
        )?.length
      : activity_list?.filter(
          i =>
            i?.[handleQuestionObject(subject_id)]?.StudentAnsAttempts?.length >
            0,
        )?.length;

  let manualMarkingCount = activity_list?.filter(
    i => i?.marked_for_manual_marking === 0,
  )?.length;
  let englishAutoMarkCount =
    // subject_id === 1
    //   ?
    activity_list?.filter(
      (item, key) =>
        item?.english_question?.english_question_parts?.length > 0 &&
        item?.english_question?.english_question_parts?.some(
          x => x?.english_question_part_automark === 0,
        ),
    )?.length;
  // : 0;
  // status=1

  if (type === 0 || type === 1 || type === 4) {
    if (
      (activity_type === 5 || activity_type === 7) &&
      manualMarkingCount > 0 &&
      (status === 1 ||
        ((type === 0 || type === 1) && lessonPlan?.ses_is_completed === 1) ||
        (type === 4 && previousPlan?.tbl_session?.ses_is_completed === 1))
    ) {
      // not marked
      //  if worksheet is not marked manually , have to show mark in the overlay
      overLayData.push(data?.MARK, data?.PREVIEW);
      if (activity_list?.length === 0 || studentAttemptCount === 0) {
        overLayData?.push(data?.DELETE);
      }
    } else if (
      activity_type === 0 &&
      +subject_id === 1 &&
      englishAutoMarkCount > 0 &&
      manualMarkingCount > 0 &&
      (status === 1 ||
        ((type === 0 || type === 1) && lessonPlan?.ses_is_completed === 1) ||
        (type === 4 && previousPlan?.tbl_session?.ses_is_completed === 1))
    ) {
      overLayData.push(data?.MARK, data?.PREVIEW);
      if (activity_list?.length === 0 || studentAttemptCount === 0) {
        overLayData?.push(data?.DELETE);
      }
    } else if (status === 1) {
      overLayData.push(data?.PREVIEW);
      // overLayData.push(data?.PREVIEW, data?.MARK); //dummy
    } else if (activity_list?.length === 0) {
      // no questions
      overLayData.push(data?.PREVIEW, data?.DELETE);
    } else if (studentAttemptCount === 0) {
      // no attempts
      overLayData.push(data?.PREVIEW, data?.DELETE);
    } else if (studentAttemptCount < activity_list?.length) {
      overLayData.push(data?.PREVIEW);
    } else {
      overLayData.push(data?.PREVIEW);
    }
  } else if (type === 3) {
    if (
      (activity_type === 5 || activity_type === 7) &&
      manualMarkingCount > 0 &&
      (status === 1 || +editLessonPlan?.tbl_session?.ses_is_completed === 1)
    ) {
      // not marked
      //  if worksheet is not marked manually , have to show mark in the overlay
      // overLayData.push(data?.MARK, data?.PREVIEW, data?.ADD_NEXT_ACTIVITY);
      overLayData.push(data?.MARK, data?.PREVIEW);
      //for remove addNextActivity
      // overLayData.push(data?.MARK, data?.PREVIEW);
      if (status === 1) {
        overLayData?.push(data?.REPEAT);
      } else if (activity_list?.length === 0 || studentAttemptCount === 0) {
        overLayData?.push(data?.DELETE);
      }
    } else if (
      activity_type === 0 &&
      +subject_id === 1 &&
      englishAutoMarkCount > 0 &&
      manualMarkingCount > 0 &&
      (status === 1 || +editLessonPlan?.tbl_session?.ses_is_completed === 1)
    ) {
      overLayData.push(data?.MARK, data?.PREVIEW, data?.ADD_NEXT_ACTIVITY);
      if (status === 1) {
        overLayData?.push(data?.REPEAT);
      } else if (activity_list?.length === 0 || studentAttemptCount === 0) {
        overLayData?.push(data?.DELETE);
      }
    } else if (status === 1) {
      if (activity_type === 2) {
        overLayData.push(data?.PREVIEW);
      } else if (activity_type === 0) {
        overLayData.push(data?.PREVIEW, data?.REPEAT, data?.ADD_NEXT_ACTIVITY);
      } else {
        overLayData.push(data?.PREVIEW, data?.REPEAT);
      }
    } else if (activity_list?.length === 0) {
      if (activity_type === 2) {
        overLayData.push(data?.PREVIEW, data?.DELETE);
      } else if (activity_type === 0) {
        overLayData.push(data?.PREVIEW, data?.ADD_NEXT_ACTIVITY, data?.DELETE);
      } else {
        overLayData.push(data?.PREVIEW, data?.DELETE);
      }
    } else if (studentAttemptCount === 0) {
      if (activity_type === 2) {
        overLayData.push(data?.PREVIEW, data?.DELETE);
      } else if (activity_type === 0) {
        overLayData.push(data?.PREVIEW, data?.ADD_NEXT_ACTIVITY, data?.DELETE);
      } else {
        overLayData.push(data?.PREVIEW, data?.DELETE);
      }
    } else if (studentAttemptCount < activity_list?.length) {
      if (activity_type === 2) {
        overLayData.push(data?.PREVIEW);
      } else if (activity_type === 0) {
        overLayData.push(data?.PREVIEW, data?.ADD_NEXT_ACTIVITY);
      } else {
        overLayData.push(data?.PREVIEW);
      }
    } else {
      if (activity_type === 0) {
        overLayData.push(data?.PREVIEW, data?.ADD_NEXT_ACTIVITY);
      } else {
        overLayData.push(data?.PREVIEW);
      }
    }
  }

  return overLayData;
};
