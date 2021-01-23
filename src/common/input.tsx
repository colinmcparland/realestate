import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { black } from "../colors";
import { mediumPadding } from "../css-constants";

const StyledInput = styled.input`
  border: 1px solid ${black};
  border-radius: 0;
  ${mediumPadding}

  &:last-child {
    border-left: none;
  }
`;

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
}

const Input: FC<InputProps> = ({ placeholder, onChange }) => (
  <StyledInput
    placeholder={placeholder}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);

export default Input;
