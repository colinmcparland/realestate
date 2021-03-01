import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { black } from "../colors";
import {
  horizontalPadding,
  mediumHorizontalPadding,
  mediumVerticalPadding,
} from "../css-constants";
import { mobile, tablet } from "../util/responsive";
import GridContainer from "./grid-container";
import StyledText from "./styled-text";

const StyledInput = styled.input`
  border: 1px solid ${black};
  border-radius: 0;
  ${mediumVerticalPadding}

  &:disabled {
    cursor: not-allowed;
    filter: brightness(50%);
  }

  ${mobile`
    ${horizontalPadding}
  `}

  ${tablet`
    ${mediumHorizontalPadding}
  `}
`;

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string | null;
  disabled?: boolean;
  label?: string;
}

const Input: FC<InputProps> = ({
  placeholder,
  onChange,
  disabled,
  value,
  label,
}) => {
  const renderLabel = (children: JSX.Element) => {
    if (label) {
      return (
        <GridContainer rowGap="small">
          <StyledText>{label}</StyledText>
          {children}
        </GridContainer>
      );
    }

    return children;
  };

  return renderLabel(
    <StyledInput
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      value={value || ""}
    />
  );
};

export default Input;
