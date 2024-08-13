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
    <Field
      name={name}
      validate={validate}
      format={format}
      parse={parse}
      initialValue={initialValue}
      validateFields={validateFields}
    >
      {({ input, meta }) => {
        // Ensure input.value is an array of plain objects
        const valueArray = Array.isArray(input.value) ? input.value : [];

        const handleChange = (
          index: number,
          key: string,
          value: string | number
        ) => {
          const updatedArray = [...valueArray];
          updatedArray[index] = {
            ...updatedArray[index],
            [key]: value,
          };
          input.onChange(updatedArray);
        };

        return (
          <div>
            {valueArray.map((obj, index) => (
              <div key={index}>
                {valueKeys.map((key) => (
                  <TextField
                    key={`${index}-${key}`}
                    value={obj[key] || ""}
                    onChange={(e) => handleChange(index, key, e.target.value)}
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
              </div>
            ))}
            {meta.touched && meta.error && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default ArrayText;
