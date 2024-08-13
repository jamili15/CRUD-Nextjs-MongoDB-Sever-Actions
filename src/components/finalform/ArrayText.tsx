import TextField from "@mui/material/TextField";
import React from "react";
import { Field } from "react-final-form";

function ArrayText() {
  return (
    <div>
      <label>Favorite Colors</label>
      <Field name="favoriteColor">
        {({ input, meta }) => {
          const handleChange = (index: number, value: string) => {
            const updatedColors = [...input.value];
            updatedColors[index] = value;
            input.onChange(updatedColors);
          };

          return (
            <div>
              {[0, 1, 2].map((index) => (
                <TextField
                  key={index}
                  value={input.value[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  label={`Color ${index + 1}`}
                  variant="outlined"
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  fullWidth
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
}

export default ArrayText;
