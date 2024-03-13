import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CommonCollapse from "./component/CommonCollapse";
import CommonModal from "components/CommonModal";
import AddNewActivity from "./component/AddNewActivity";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addActivity,
  deleteActivity,
  getMyLibraryDetails,
  // handleMyLibraryPage,
  handleMyLibrarySearch,
} from "./features/myLibrarySlice";
import { columns } from "./constant/myLibraryConstant";
import SearchBar from "./component/SearchBar";
import useDebounced from "hooks/useDebounced";
import { toast } from "react-toastify";
import MyLibraryHeader from "./component/MyLibraryHeader";
import DeleteModal from "./component/DeleteModal";
import { getDurationName } from "./utils/getDurationName";
import { activityTypes } from "./constant/activityTypes";

const initialActivity = {
  library_item_id: 0,
  subject: "",
  topic: "",
  activity_type: "",
  activity_name: "",
  source: "",
  duration: "",
  file: "",
  link: "",
  video: "",
};
const errorInitialValue = {
  library_item_id: 0,
  subject: false,
  topic: false,
  activity_type: false,
  activity_name: false,
  source: false,
  duration: false,
  file: false,
  link: false,
  video: false,
};

const MyLibrary = () => {
  const dispatch = useDispatch();
  const {
    myLibraryDetails: {
      list,
      // page, totalPage,
      isLoading,
    },
  } = useSelector(state => state.myLibrary);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounced(search?.trim());
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: "",
    isLoad: false,
  });
  // const [isDefaultShow, setDefaultShow] = useState(false);
  const [addUpdate, setAddUpdate] = useState({
    subjectId: "",
    topicId: "",
  });

  const [activityModal, setActivityModal] = useState(false);
  const [activityEditModal, setActivityEditModal] = useState({
    show: false,
    data: "",
  });
  const [values, setValues] = useState(initialActivity);
  const [errorValues, setErrorValues] = useState(errorInitialValue);
  const [btnLoad, setBtnLoad] = useState(false);
  const isSearch = debounceSearch && !isLoading && list?.length === 0;

  const handleSearch = val => {
    setSearch(val);
    dispatch(handleMyLibrarySearch(val));
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      id: "",
      show: false,
      isLoad: false,
    });
  };

  const handleDeleteActivity = () => {
    setDeleteModal({ ...deleteModal, isLoad: true });
    dispatch(
      deleteActivity({
        library_item_id: deleteModal?.id,
      }),
    ).then(res => {
      if (res?.payload?.statusCode === 200) {
        toast.success(res.payload.data);
      } else {
        if (res?.payload?.statusCode === 201) {
          toast.warning(res.payload.data);
        }
      }

      handleCloseDeleteModal();
      dispatch(getMyLibraryDetails({ search: debounceSearch }));
      setAddUpdate({
        subjectId: deleteModal?.subject_id,
        topicId: "",
      });
    });
  };

  useEffect(() => {
    dispatch(getMyLibraryDetails({ search: debounceSearch }));
  }, [debounceSearch, dispatch]);

  const isValidUrl = urlString => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const validate = () => {
    if (!values?.subject) {
      setErrorValues(prev => ({
        ...prev,
        subject: true,
      }));
      return false;
    } else if (!values?.activity_type?.value) {
      setErrorValues(prev => ({
        ...prev,
        activity_type: true,
      }));
      return false;
    } else if (!values?.activity_name) {
      setErrorValues(prev => ({
        ...prev,
        activity_name: true,
      }));

      return false;
    } else if (!values?.duration?.value) {
      setErrorValues(prev => ({
        ...prev,
        duration: true,
      }));
      return false;
    } else if (values?.activity_type?.value === 5 && !values?.file) {
      setErrorValues(prev => ({
        ...prev,
        file: true,
      }));
      return false;
    } else if (values?.activity_type?.value === 3 && !values?.link) {
      setErrorValues(prev => ({
        ...prev,
        link: true,
      }));
      return false;
    } else if (values?.activity_type?.value === 1 && !values?.video) {
      setErrorValues(prev => ({
        ...prev,
        video: true,
      }));
      return false;
    } else if (
      values?.activity_type?.value === 3 &&
      !isValidUrl(values?.link)
    ) {
      setErrorValues(prev => ({
        ...prev,
        linkValid: true,
      }));
      return false;
    } else if (
      values?.activity_type?.value === 1 &&
      !isValidUrl(values?.video)
    ) {
      setErrorValues(prev => ({
        ...prev,
        linkValid: true,
      }));
      return false;
    } else {
      return true;
    }
  };

  const handleActivitySubmit = () => {
    setErrorValues(errorInitialValue);
    if (validate()) {
      setBtnLoad(true);
      let payload = {
        library_item_id: values?.library_item_id,
        subject_id: values?.subject,
        // topic_id: values?.topic,
        topic_id: 0,
        activity_type: values?.activity_type?.value,
        activity_name: values?.activity_name,
        source: values?.source,
        duration: values?.duration?.value,
        link:
          values?.activity_type?.value === 5
            ? values?.file
            : values?.activity_type?.value === 3
            ? values?.link
            : values?.activity_type?.value === 1
            ? values?.video
            : "",
      };

      dispatch(addActivity(payload)).then(res => {
        setBtnLoad(false);
        if (res?.payload?.statusCode === 200) {
          dispatch(getMyLibraryDetails({ search: debounceSearch }));
          setAddUpdate({
            subjectId: res?.payload?.data?.fk_sub_id,
            topicId: res?.payload?.data?.fk_activity_topic_id,
          });
          if (+values?.library_item_id === 0) {
            toast.success("Added successfully...");
          } else {
            toast.success("Updated successfully...");
          }
          setActivityModal(false);
          setActivityEditModal({
            show: false,
            data: "",
          });
          setValues(initialActivity);
          setErrorValues(errorInitialValue);
        } else {
          toast.error("Something went wrong");
        }
      });
    }
  };

  useEffect(() => {
    if (activityEditModal.data) {
      const {
        fk_sub_id,
        name,
        activity_type,
        fk_activity_topic_id,
        source,
        duration,
        pk_tutor_library_item_id,
      } = activityEditModal.data;
      setValues({
        library_item_id: pk_tutor_library_item_id,
        subject: +fk_sub_id,
        topic: fk_activity_topic_id,
        activity_type: activityTypes.find(x => x.value === activity_type),
        activity_name: name,
        source: source,
        duration: getDurationName(duration),
        file: activity_type === 5 ? activityEditModal.data?.link : "",
        link: activity_type === 3 ? activityEditModal.data?.link : "",
        video: activity_type === 1 ? activityEditModal.data?.link : "",
      });
    }
  }, [activityEditModal]);

  return (
    <>
      <div className={styles.mainContainer}>
        <SearchBar
          search={search}
          handleSearch={handleSearch}
          setActivityModal={setActivityModal}
        />

        <div className={styles.tabContentWrapper}>
          <MyLibraryHeader headers={columns} styles={styles} />
          {isSearch ? (
            <div className={styles.noData}>No data found</div>
          ) : isLoading ? (
            <div className={styles.loader}></div>
          ) : !isLoading && list?.length === 0 ? (
            <div className={styles.noData}>No data </div>
          ) : (
            <div className={styles.contentDiv}>
              {list?.map((x, index) => (
                <CommonCollapse
                  key={index}
                  showModal={setActivityEditModal}
                  setDeleteModal={setDeleteModal}
                  isOpen={true}
                  title={x?.subject_name}
                  parentKey={index + x?.subject_id}
                  parentStyle={styles}
                  innerData={x?.TutorLibraryItems}
                  isDefaultShow={
                    +x?.subject_id === +addUpdate?.subjectId ? true : false
                  }
                  isOther={+x?.subject_id === 3 ? true : false}
                  addUpdate={addUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <CommonModal
        show={activityModal}
        closeModal={() => {
          setActivityModal(false);
          setValues(initialActivity);
          setErrorValues(errorInitialValue);
        }}
        hide={() => handleActivitySubmit()}
        title={"Add New Activity"}
        modalBody={AddNewActivity({
          values: values,
          setValues: setValues,
          errorValues: errorValues,
          setErrorValues: setErrorValues,
          isValidUrl: isValidUrl,
        })}
        btnPrimary={"Add"}
        isDisable={btnLoad}
      />

      <CommonModal
        show={activityEditModal?.show}
        title={"Edit Activity"}
        modalBody={AddNewActivity({
          values: values,
          setValues: setValues,
          errorValues: errorValues,
          isEdit: true,
          setErrorValues: setErrorValues,
          isValidUrl: isValidUrl,
        })}
        btnPrimary={"Edit"}
        hide={() => handleActivitySubmit()}
        closeModal={() => {
          setValues(initialActivity);
          setErrorValues(errorInitialValue);
          setActivityEditModal(false);
        }}
        isDisable={btnLoad}
      />
      {deleteModal.show ? (
        <DeleteModal
          show={deleteModal.show}
          onHide={handleCloseDeleteModal}
          deleteConfirmation={handleDeleteActivity}
          isLoad={deleteModal?.isLoad}
        />
      ) : null}
    </>
  );
};

export default MyLibrary;
