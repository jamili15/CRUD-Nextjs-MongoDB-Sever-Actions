"use client";

import React, { useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createPost, updatePost } from "@/_actions/postActions";
import { useMyContext } from "@/context/Provider";

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
      render={({ handleSubmit, submitting, pristine, form, values }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (handleSubmit) {
              handleSubmit(e)?.then(() => {
                if (form) {
                  form.reset();
                }
              });
            }
          }}
          className="flex flex-col gap-2 pl-2 items-center"
        >
          <Field name="title">
            {({ input, meta }) => (
              <div>
                <TextField
                  {...input}
                  label="Title"
                  variant="outlined"
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  fullWidth
                />
              </div>
            )}
          </Field>
          <Field name="description">
            {({ input, meta }) => (
              <div>
                <TextField
                  {...input}
                  label="Description"
                  variant="outlined"
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  fullWidth
                />
              </div>
            )}
          </Field>
          <Field name="image">
            {({ input, meta }) => (
              <div>
                <TextField
                  {...input}
                  label="Image"
                  variant="outlined"
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  fullWidth
                />
              </div>
            )}
          </Field>
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
        </form>
      )}
    />
  );
};

export default PostForm;
