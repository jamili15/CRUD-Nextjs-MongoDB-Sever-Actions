import TextField from "@mui/material/TextField";
import React from "react";
import { Field } from "react-final-form";

interface ObjTextProps {
  className?: string;
  name: string;
  valueKeys: string[] | number[];
  labels?: Record<string, string>;
  validate?: (value: any) => undefined | string | Promise<any>;
  validateFields?: string[];
  format?: (value: any) => any;
  parse?: (value: any) => any;
  initialValue?: any;
  type?: string;
  placeholder?: string;
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

function ObjText({
  className,
  name,
  valueKeys,
  labels = {},
  validate,
  format,
  parse,
  initialValue,
  validateFields,
  type,
  placeholder,
  fullWidth,
  margin,
  variant,
  rows,
  multiline,
  select,
  inputProps,
  InputProps,
  helperText,
  error,
}: ObjTextProps) {
  return (
    <Field
      name={name}
      validate={validate}
      format={format}
      parse={parse}
      initialValue={initialValue}
      validateFields={validateFields}
    >
      {({ input, meta }) => {
        const initialValues = [].reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {} as Record<string, string>);

        const val = input.value || initialValues;

        const handleChange = (key: string | number, value: string) => {
          const updatedVal = { ...val, [key]: value };
          input.onChange(updatedVal);
        };

        return (
          <>
            {valueKeys.map((key, index) => (
              <TextField
                key={index}
                value={val[key] || ""}
                type={type}
                placeholder={placeholder}
                fullWidth={fullWidth}
                margin={margin}
                variant={variant}
                rows={rows}
                multiline={multiline}
                select={select}
                InputProps={InputProps}
                inputProps={inputProps}
                helperText={
                  meta.touched && meta.error ? meta.error : helperText
                }
                error={meta.touched && (meta.error || error)}
                className={className}
                onChange={(e) => handleChange(key, e.target.value)}
                label={labels[key] || key}
              />
            ))}
            {meta.touched && meta.error && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </>
        );
      }}
    </Field>
  );
}

export default ObjText;
