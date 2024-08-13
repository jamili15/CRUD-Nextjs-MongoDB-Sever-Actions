"use client";

import React, { useRef, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createPost, updatePost } from "@/_actions/postActions";
import { useMyContext } from "@/context/Provider";
import Form from "./Form";
import InputText from "../materialui/InputText";

const PostForm: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { editPost, setEditPost } = useMyContext();

  const onSubmit = async (
    formValues: Record<string, any>,
    form: Record<string, any>
  ) => {
    console.log("Form Data", formValues);

    try {
      if (editPost) {
        await updatePost({ ...formValues, _id: editPost._id });
        setStatus("Post updated successfully");
      } else {
        await createPost(formValues);
        setStatus("Post created successfully");
      }

      setEditPost(null);
      setError(null);
      form.restart();
    } catch (err) {
      setError(editPost ? "Failed to update post" : "Failed to create post");
    }
  };

  const validate = (values: Record<string, any>) => {
    const errors: Partial<Record<string, any>> = {};

    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.image) {
      errors.image = "Image is required";
    }
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={editPost}
      render={({ submitting, pristine, form, values }) => (
        <>
          <InputText name="title" label="Title" variant="outlined" />
          <InputText
            name="description"
            label="Description"
            variant="outlined"
          />
          <InputText name="image" label="Image" variant="outlined" />

          <div className="flex gap-2 mt-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitting || pristine}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => form.reset()}
              disabled={submitting || pristine}
            >
              Reset
            </Button>
          </div>
          <pre>{JSON.stringify(values)}</pre>
          {status && <p className="text-green-500">{status}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    />
  );
};

export default PostForm;
