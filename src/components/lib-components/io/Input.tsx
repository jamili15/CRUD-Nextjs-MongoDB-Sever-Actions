import React from "react";
import TextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

type TextProps = {
  label?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
} & MuiTextFieldProps;

const Input: React.FC<TextProps> = ({
  title,
  label,
  validate,
  ...restProps
}) => {
  return <TextField label={label} {...restProps} />;
};

export default Input;
