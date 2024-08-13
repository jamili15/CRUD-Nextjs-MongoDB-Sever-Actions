import { FormApi, SubmissionErrors, ValidationErrors } from "final-form";
import React from "react";
import { Form } from "react-final-form";

interface FinalFormProps {
  onSubmit: (
    values: Record<string, any>,
    form: FormApi<Record<string, any>>
  ) => SubmissionErrors | Promise<SubmissionErrors | void> | void;
  initialValues?: Record<string, any>;
  render?: (props: {
    handleSubmit: () => void;
    form: FormApi<Record<string, any>>;
    submitting: boolean;
    pristine: boolean;
    values: Record<string, any>;
  }) => React.ReactNode;
  children?: React.ReactNode;
  validate?: (
    values: Record<string, any>
  ) => ValidationErrors | Promise<ValidationErrors>;
}

const FinalForm: React.FC<FinalFormProps> = ({
  onSubmit,
  initialValues,
  render,
  children,
  validate,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          {render
            ? render({ handleSubmit, form, submitting, pristine, values })
            : children}
        </form>
      )}
    />
  );
};

export default FinalForm;
