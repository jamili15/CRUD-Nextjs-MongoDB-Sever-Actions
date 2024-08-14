import TextField from "@mui/material/TextField";
import React from "react";
import { Field } from "react-final-form";

interface ArrayTextProps {
  className?: string;
  name: string;
  valueKeys: string[];
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

const ArrayText: React.FC<ArrayTextProps> = ({
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
}) => {
  return (
    <div>
      <Field
        name={name}
        validate={validate}
        format={format}
        parse={parse}
        initialValue={initialValue}
        validateFields={validateFields}
      >
        {({ input, meta }) => {
          // Initialize the array if it's undefined
          const values = input.value || valueKeys.map(() => "");

          const handleChange = (index: number, value: string) => {
            const updatedValues = [...values];
            updatedValues[index] = value;
            input.onChange(updatedValues);
          };

          return (
            <div>
              {valueKeys.map((key, index) => (
                <TextField
                  key={key}
                  value={values[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
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
                  label={labels[key] || key}
                />
              ))}
              {meta.touched && meta.error && (
                <span style={{ color: "red" }}>{meta.error}</span>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default ArrayText;
