import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "../components/Form/UserRegistrationForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  subjects:{
    number: string;
    address:string;
  }[]
  
}

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  subjects:yup.array().of(
    yup.object().shape({
      number: yup.string().required("Phone number is required"),
      address: yup.string().required("address is required is required"),
    })
  ),
});

const Forms = () => {


  const onSubmit = (data: FormData) => {
    console.log("Form submitted", data);
    alert(JSON.stringify(data));
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const [subjectFields, setSubjectFields] = React.useState<string[]>([""]);
  const [addressFields, setaddressFields] = React.useState<string[]>([""]);
  

  const addAddressField = () => {
    setaddressFields([...addressFields, ""]);
  };

  const addSubjectField = () => {
    setSubjectFields([...subjectFields, ""]);
  };

  const removeAddressField = (index: number) => {
    const newAddressFields = [...addressFields];
    newAddressFields.splice(index, 1);
    setSubjectFields(newAddressFields);
  };

  const removeSubjectField = (index: number) => {
    const newSubjectFields = [...subjectFields];
    newSubjectFields.splice(index, 1);
    setSubjectFields(newSubjectFields);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.box}>
        <div className={styles.box1}>
          <label>First Name</label>
          <input {...register("firstName")} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.box1}>
          <label>Age</label>
          <input type="number" {...register("age")} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.box1}>
          <label>Subjects</label>
          {subjectFields.map((number, index) => (
            <div key={index}>
              <input
                placeholder="Enter a subject"
                value={number}
                onChange={(e) => {
                  const newSubjectFields = [...subjectFields];
                  newSubjectFields[index] = e.target.value;
                  setSubjectFields(newSubjectFields);
                }}
              />
              <button type="button" onClick={() => removeSubjectField(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSubjectField}>
            Add More Subjects
          </button>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.box1}>
          <label>Address</label>
          {subjectFields.map((address, index) => (
            <div key={index}>
              <input
                placeholder="Enter a address"
                value={address}
                onChange={(e) => {
                  const newAddressFields = [...addressFields];
                  newAddressFields[index] = e.target.value;
                  setaddressFields(newAddressFields);
                }}
              />
              <button type="button" onClick={() => removeAddressField(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAddressField}>
            Add More Subjects
          </button>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Forms;