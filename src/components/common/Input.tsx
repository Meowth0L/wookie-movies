import React, { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/colors";
import { TypographyMap } from "./Typography";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange?(value: string, name?: string): void;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Input = (props: InputProps) => {
  const { title, defaultValue = "", value: controlledValue, ...rest } = props;
  const [value, setValue] = useState(defaultValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange?.(newValue, event.target.name);
  };
  return <StyledInput value={controlledValue || value} {...rest} onChange={onChange} />;
};

const StyledInput = styled.input`
  border: 1px solid ${Colors.WHITE};
  border-radius: 50px;
  padding: 8px 24px;
  ${TypographyMap.text}
  color: ${Colors.WHITE};
  outline: none !important;
  height: 40px;
  box-sizing: border-box;
  background-color: ${Colors.BLACK};

  ::placeholder {
    color: ${Colors.WHITE_SECONDARY};
  }
`;

export default React.memo(Input);
