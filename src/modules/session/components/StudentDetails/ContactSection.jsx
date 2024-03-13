import { useSelector } from "react-redux";
import styles from "../Modals/ModalForStudentDetails.module.scss";
import { useEffect } from "react";
import moment from "moment";
const ContactSection = ({ loading, setLoading }) => {
  const { studentDetails } = useSelector(state => state.session);
  useEffect(() => {
    setLoading(true);
    if (studentDetails?.student) {
      setLoading(false);
    }
  }, [setLoading, studentDetails?.student]);
  const ContactSectionItem = ({ caption, list }) => {
    return (
      <div className={styles.studentDetailsContactSectionContent}>
        <label>{caption}</label>
        {list?.map((item, i) => {
          return (
            <div key={i} className={styles.studentDetailsContactSectionItem}>
              <label>{item?.label}</label>
              <span>{item?.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
  const student_details = [
    {
      label: "Gender Identity",
      name: studentDetails?.student?.st_gender,
    },
    {
      label: "Date of birth",
      name: studentDetails?.student?.st_dob
        ? moment(studentDetails?.student?.st_dob).format("DD MMM yyyy")
        : null,
    },
    {
      label: "School",
      name: studentDetails?.student?.tbl_school?.sc_name,
    },
    {
      label: "Email",
      name: studentDetails?.student?.st_email,
    },
    {
      label: "Mobile",
      name: studentDetails?.student?.st_phone,
    },
    {
      label: "Country",
      name: studentDetails?.student?.st_country,
    },
  ];
  const contact_details = [
    {
      label: "Given name",
      name: studentDetails?.student?.tbl_parstu_relation?.tbl_parent
        ?.par_firstname,
    },
    {
      label: "Family name",
      name: studentDetails?.student?.tbl_parstu_relation?.tbl_parent
        ?.par_surname,
    },
    {
      label: "Relationship",
      name: studentDetails?.student?.tbl_parstu_relation?.ps_relationship,
    },
    {
      label: "Mobile",
      name: studentDetails?.student?.tbl_parstu_relation?.tbl_parent?.par_phone,
    },
    {
      label: "Work",
      name: studentDetails?.student?.tbl_parstu_relation?.tbl_parent?.par_phone,
    },
    {
      label: "Email",
      name: studentDetails?.student?.tbl_parstu_relation?.tbl_parent
        ?.par_emailid,
    },
  ];
  return !loading ? (
    <div className={styles.studentDetailsContactSectionMainContainer}>
      <ContactSectionItem list={student_details} caption={"Student Details"} />
      <ContactSectionItem list={contact_details} caption={"Contact Details"} />
    </div>
  ) : (
    <div className={styles.loader} />
  );
};
export default ContactSection;
