import React from "react";
import { Field } from "react-final-form";
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  className?: string;
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  validateFields?: string[];
  format?: (value: any) => any;
  parse?: (value: any) => any;
  initialValue?: any;
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";
  variant?: "standard" | "outlined" | "filled";
  rows?: number;
  multiline?: boolean;
  select?: boolean;
  InputProps?: object;
  inputProps?: object;
  helperText?: string;
  error?: boolean;
}

const InputText: React.FC<InputFieldProps> = ({
  className,
  name,
  type,
  placeholder,
  label,
  validate,
  validateFields,
  format,
  parse,
  initialValue,
  fullWidth = false,
  margin = "none",
  variant = "outlined",
  rows,
  multiline = false,
  select = false,
  InputProps,
  inputProps,
  helperText,
  error,
}) => {
  return (
    <Field
      name={name}
      validate={validate}
      format={format}
      parse={parse}
      initialValue={initialValue}
      validateFields={validateFields}
    >
      {({ input, meta }) => (
        <TextField
          {...input}
          type={type}
          placeholder={placeholder}
          label={label}
          fullWidth={fullWidth}
          margin={margin}
          variant={variant}
          rows={rows}
          multiline={multiline}
          select={select}
          InputProps={InputProps}
          inputProps={inputProps}
          helperText={meta.touched && meta.error ? meta.error : helperText}
          error={meta.touched && (meta.error || error)}
          className={className}
        />
      )}
    </Field>
  );
};

export default InputText;
