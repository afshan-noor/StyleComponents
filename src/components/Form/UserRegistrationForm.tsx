import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import styles from "./UserRegistrationForm.module.css";

type FormValues = {
  username: string;
  email: string;
  phNumbers: {
    number: string;
  }[];
  addresses: {
    address: string;
  }[];
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .notOneOf(["admin@example.com"], "Enter a different email address")
    .required("Email is required"),
  phNumbers: yup.array().of(
    yup.object().shape({
      number: yup.string().required("Phone number is required"),
    })
  ),
  addresses: yup.array().of(
    yup.object().shape({
      address: yup.string().required("Address is required"),
    })
  ),
});

export const Form = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      phNumbers: [{ number: "" }],
      addresses: [{ address: "" }],
    },
    resolver: yupResolver(validationSchema) as any,
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const {
    fields: phoneNumbers,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const {
    fields: addresses,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    name: "addresses",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
    alert(JSON.stringify(data));
  };

  const [fieldsAdded, setFieldsAdded] = useState(false);

  const addPhoneAndAddress = () => {
    appendPhoneNumber({ number: "" });
   appendAddress({ address: "" });
    setFieldsAdded(true);
  };

  const removePhoneAndAddress = () => {
    if (fieldsAdded) {
      phoneNumbers.forEach((_, index) => removePhoneNumber(index));
     addresses.forEach((_, index) => removeAddress(index));
      setFieldsAdded(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.box}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username")}  />
           {errors.username && <p className="error">{errors.username?.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
           {errors.email && <p className="error">{errors.email?.message}</p>}
          </div>
        </div>

        <div className={styles.box}>
          <div>
            <div>
              {phoneNumbers.map((field, index) => (
                <div className="form-control" key={field.id}>
                  <label htmlFor={`phNumbers.${index}.number`}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`)}
                  />
                 {errors.phNumbers?.[index] && <p className="error">
                    {errors.phNumbers?.[index]?.number?.message}
                  </p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              {addresses.map((field, index) => (
                <div className="form-control" key={field.id}>
                  <label htmlFor={`addresses.${index}.address`}>Address</label>
                  <input
                    type="text"
                    {...register(`addresses.${index}.address`)}
                  />
                  {errors.addresses?.[index] && (
                    <p className="error">
                      {errors.addresses?.[index]?.address?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.Button}>
          <button type="button" onClick={addPhoneAndAddress}>
            Add Phone and Address
          </button>
          {fieldsAdded && (
            <button type="button" onClick={removePhoneAndAddress}>
              Remove 
            </button>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


