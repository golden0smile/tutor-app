import CustomSelect from "components/CommonDropDown";
import { toast } from "react-toastify";
import styles from "./ModalforAwardSession.module.scss";

const inValid = () => /[a-zA-Z_@*%!$^[\]{}`\\()"/#&+-]/;
const AllStudent = [
  {
    label: "All students in the class",
    value: 0,
  },
];

const AddCoinSection = (list, setData, data) => {
  const studentDropDown = list?.tbl_session_time?.tbl_student_enrolments?.map(
    y => ({
      label: y?.tbl_student?.st_first_name + " " + y?.tbl_student?.st_surname,
      value: y?.tbl_student?.pk_student_key,
    }),
  );

  const handleStudentChange = val => {
    const selectedValues = val.map(option => option.value);
    setData(prev => ({
      ...prev,
      student: selectedValues.includes(0)
        ? val.filter(x => x.value === 0)
        : val,
    }));
  };

  return (
    <div>
      <div className={styles.modalBody}>
        <div className={styles.modalContainerItem}>
          <label>Student List</label>

          <CustomSelect
            placeHolder="Select student list"
            list={
              data?.student[0]?.value === 0
                ? []
                : [...AllStudent, ...(studentDropDown || [])]
            }
            value={data?.student}
            isMulti={true}
            handleChange={handleStudentChange}
          />
        </div>
        <div className={styles.modalContainerItem}>
          <label>No of coins</label>
          <input
            type="text"
            className={styles.modalInput}
            placeholder="0"
            value={data?.coin}
            onChange={e => {
              const value = e.target.value;
              if (+value > 9_999_999) {
                toast.dismiss();
                toast.info("Amount of coins is too high!");
                return;
              }
              if (!inValid().test(value) && !Number.isNaN(+value)) {
                setData(prev => ({
                  ...prev,
                  coin: +value,
                }));
              } else {
                setData(prev => ({
                  ...prev,
                  coin: "",
                }));
              }
            }}
          />
        </div>

        <div className={styles.modalContainerItem}>
          <label>Reason</label>
          <textarea
            placeholder="Notes"
            onChange={e => {
              setData(prev => ({
                ...prev,
                reason: e.target.value,
              }));
            }}
            className={styles.modalInput}
            value={data?.reason}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export { AddCoinSection };
