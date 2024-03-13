import CommonTable from "components/CommonTable";
import {
  filterName,
  placeholderMsg,
  // studentTable,
} from "constants/CustomTableConstant";
import { RightArrow } from "constants/images";
import {
  getStudentAllDetail,
  handleClearAllFilters,
  handleSort,
  handleStudentLevelFilter,
  handleStudentSchoolFilter,
  handleStudentSizePerPage,
  handleStudentUnplannedLessonFilter,
} from "./features/studentSlice";
import ModalForStudentDetails from "modules/session/components/Modals/ModalforStudentDetails";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useDebounced from "hooks/useDebounced";
import {
  getActivityLevel,
  getPastSessions,
  handlePastSessionSortField,
  handlePastSessionSortOrder,
} from "modules/session/features/sessionSlice";
import CommonModal from "components/CommonModal";
import SortTable from "modules/session/components/SortTable";
import { useNavigate } from "react-router-dom";
import routesConstants from "routes/routesConstants";

const Students = () => {
  const [search, setSearch] = useState();
  const [schoolData, setSchoolData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const debounceSearch = useDebounced(search?.trim());
  const [modalForStudentDetails, setModalForStudentDetails] = useState(false);
  const [modalForViewPastLessons, setModalForViewPastLessons] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    page,
    sizePerPage,
    sortField,
    sortOrder,
    schoolFilterR,
    unPlannedLesson,
    levelFilterR,
    StudentsDetails,
    isLoading,
  } = useSelector(state => state.student);
  const {
    pastSession,
    pastSession_sortOrder,
    pastSession_sortField,
    pastSessionLoading,
  } = useSelector(state => state.session.studentDetails);
  const initialFilter = useMemo(
    () => ({
      level: levelFilterR,
      school: schoolFilterR,
    }),
    [levelFilterR, schoolFilterR],
  );

  const hasFilter = useMemo(() => {
    return [levelFilterR, schoolFilterR, unPlannedLesson].some(x => !!x);
  }, [levelFilterR, schoolFilterR, unPlannedLesson]);

  const handleArrow = rowData => {
    // navigate("/" + routesConstants.SESSION_PAGE + "/" + id)
    setModalForStudentDetails(true);
    setSingleStudentData(rowData);
    const payload = {
      pk_student_key: rowData?.pk_student_key,
    };
    dispatch(getPastSessions(payload));
  };
  const [singleStudentData, setSingleStudentData] = useState("");

  const columns = [
    {
      dataField: "pk_student_id",
      text: "Student ID",
      sort: true,
    },
    {
      dataField: "sname",
      text: "Student Name",
      sort: true,
      formatter: (cellContent, row) => {
        return <div>{row?.st_first_name + " " + row?.st_surname}</div>;
      },
    },
    {
      dataField: "st_year_level",
      text: "Level",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <div>
            {row?.activity_level?.level_name
              ? row?.activity_level?.level_name
              : "-"}
          </div>
        );
      },
    },
    {
      dataField: "fk_sc_id",
      text: "School",
      sort: true,
      formatter: (cellContent, row) => {
        return <div>{row?.fk_sc_id ? row?.fk_sc_id : "-"}</div>;
      },
    },
    {
      dataField: "total_session",
      text: "Sessions Attended",
      sort: true,
    },
    {
      dataField: "nextSession",
      text: "Next Session",
      sort: true,
      formatter: (cellContent, row) => {
        const isData = row?.ses_date;
        return <div>{isData ? isData : "-"}</div>;
      },
    },

    {
      dataField: "action",
      text: "",
      formatter: (cellContent, row) => {
        return (
          <img
            src={RightArrow}
            alt=""
            onClick={() => handleArrow(row)}
            className="cursor-pointer"
          />
        );
      },
    },
  ];

  const handleSearch = val => {
    setSearch(val);
  };
  const handleFilter = (val, type) => {
    if (type === filterName.SCHOOL) {
      dispatch(handleStudentSchoolFilter(val.value));
    } else if (type === filterName.LEVEL) {
      dispatch(handleStudentLevelFilter(val.value));
    }
  };

  const handleSizePerPageChange = val => {
    // console.log(val);
    dispatch(handleStudentSizePerPage(val.value));
  };

  const handlePageChange = val => {
    // console.log(val);
  };

  const onTableChange = (type, { sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(
          handleSort({
            field: sortField,
            order: sortOrder,
          }),
        );

        break;

      default:
        break;
    }
  };
  const handleClearFilter = () => {
    dispatch(handleClearAllFilters());
  };

  const getLevel = useCallback(async () => {
    const levelPayload = {
      subject_id: 0,
    };
    dispatch(getActivityLevel(levelPayload)).then(res => {
      const mathsData =
        res?.payload?.data?.activityLevels?.filter(x => x?.subject_id === 2) ||
        [];
      const englishData =
        res?.payload?.data?.activityLevels?.filter(x => x?.subject_id === 1) ||
        [];
      const subjectData = [...englishData, ...mathsData];
      const groupedData = subjectData.reduce((groups, subject) => {
        const label = subject.subject_id === 1 ? "English" : "Maths";
        if (!groups[label]) {
          groups[label] = [];
        }

        groups[label].push({
          label: subject.level_name,
          value: subject.activity_level_id,
        });

        return groups;
      }, {});

      const result = Object.keys(groupedData).map(label => ({
        label,
        options: groupedData[label],
      }));
      setLevelData(result);
    });
  }, [dispatch]);

  const handleUnplannedLesson = val => {
    const unplannedLesson = val.target.checked;
    dispatch(handleStudentUnplannedLessonFilter(unplannedLesson));
  };
  const onPastSessionTableChange = (type, { sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(handlePastSessionSortField(sortField));
        dispatch(handlePastSessionSortOrder(sortOrder));
        break;
      default:
        break;
    }
  };
  const handleRedirectFromPastLesson = data => {
    setModalForStudentDetails(false);
    setModalForViewPastLessons(false);
    navigate("/" + routesConstants.SESSION_PAGE + "/" + data.pk_ses_key);
  };
  useEffect(() => {
    if (singleStudentData?.pk_student_key) {
      const payload = {
        pk_student_key: singleStudentData?.pk_student_key,
        sort_by: pastSession_sortField,
        sort_order: pastSession_sortOrder,
      };
      dispatch(getPastSessions(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastSession_sortOrder, pastSession_sortField, dispatch]);

  useEffect(() => {
    dispatch(
      getStudentAllDetail({
        search: debounceSearch,
        sort_field: sortField,
        sort_order: sortOrder,
        levelFilter: levelFilterR,
        schoolFilter: schoolFilterR,
        unplannedLesson: unPlannedLesson,
        // page: page,
        // limit: sizePerPage,
      }),
    );
  }, [
    dispatch,
    sortField,
    levelFilterR,
    sortOrder,
    debounceSearch,
    unPlannedLesson,
    // page,
    // sizePerPage,
    schoolFilterR,
  ]);

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  return (
    <div className="p-3">
      <CommonTable
        keyField="pk_student_id"
        isBackArrow={true}
        tableTitle="Students"
        handleFilters={true}
        isSearch={true}
        search={search}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        handleSizePerPageChange={handleSizePerPageChange}
        handlePageChange={handlePageChange}
        onTableChange={onTableChange}
        columns={columns}
        // list={studentTable}
        list={StudentsDetails}
        isHeading={true}
        isLevel={true}
        isLevelGroup={true}
        isSchool={true}
        schoolList={schoolData}
        levelData={levelData}
        page={page}
        sizePerPage={sizePerPage}
        placeholderMsg={placeholderMsg.STUDENTS}
        isFilter={hasFilter}
        filterState={initialFilter}
        isPagination={false}
        handleClearFilter={handleClearFilter}
        handleUnplannedLesson={handleUnplannedLesson}
        unPlannedLesson={unPlannedLesson}
        loading={isLoading}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      {modalForStudentDetails && (
        <ModalForStudentDetails
          session={true}
          student_key={singleStudentData?.pk_student_key}
          subject_id={singleStudentData?.tbl_student_enrolments[0]?.tbl_enrolment_subjects
            ?.map(x => x?.fk_sub_id)
            ?.sort()}
          modalForViewPastLessons={modalForViewPastLessons}
          setModalForViewPastLessons={setModalForViewPastLessons}
          closeModal={setModalForStudentDetails}
        />
      )}
      {modalForViewPastLessons && (
        <CommonModal
          closeModal={() => setModalForViewPastLessons(false)}
          show={modalForViewPastLessons}
          title={"View past sessions"}
          hide={() => setModalForViewPastLessons(false)}
          modalBody={SortTable(
            pastSession,
            onPastSessionTableChange,
            pastSessionLoading,
            pastSession_sortField,
            pastSession_sortOrder,
            handleRedirectFromPastLesson,
          )}
        />
      )}
    </div>
  );
};

export default Students;
