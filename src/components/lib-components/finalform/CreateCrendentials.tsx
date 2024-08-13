"use client";

import React from "react";
import { createPost } from "@/_actions/postActions";
import Form from "./Form";
import InputText from "../materialui/InputText";
import ObjText from "../materialui/ObjText";
import ArrayText from "../materialui/ArrayText";

const CreateCrendentials = () => {
  const onSubmit = async (
    formValues: Record<string, any>,
    form: Record<string, any>
  ) => {
    await createPost(formValues);
    console.log("FormValues", JSON.stringify(formValues, null, 2));
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    age: "",
    account: {
      username: "",
      email: "",
      password: "",
    },
    colors: [{}, {}],
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ submitting, pristine, form, values }) => (
        <>
          <InputText name="firstname" label="First Name" variant="outlined" />
          <InputText name="lastname" label="Last Name" variant="outlined" />
          <InputText name="age" label="Age" variant="outlined" />
          <ObjText
            name="account"
            valueKeys={["username", "email", "password"]}
            labels={{
              username: "User Name",
              email: "Email Address",
              password: "Password",
            }}
          />
          <ArrayText
            name="colors"
            valueKeys={["red", "blue", "green"]}
            labels={{
              red: "Red",
              blue: "Blue",
              green: "Green",
            }}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <button type="submit">Submit</button>
        </>
      )}
    />
  );
};

export default CreateCrendentials;
