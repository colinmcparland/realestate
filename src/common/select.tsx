import React, { FC, SyntheticEvent, useState } from "react";
import styled, { css } from "styled-components";
import idGenerator from "react-id-generator";
import { black, darkOrange, white } from "../colors";
import { padding } from "../css-constants";
import GridContainer from "./grid-container";
import StyledText from "./styled-text";

const SelectContainer = styled(GridContainer)`
  width: 100%;
`;

interface StyledSelectProps {
  open: boolean;
}

const StyledSelect = styled(GridContainer)<StyledSelectProps>`
  position: relative;
  ${padding}
  border: 1px solid ${black};
  cursor: pointer;
  background-color: ${white};
  transition: filter ease-in-out 0.2s;

  &:after {
    content: "▼";
    width: 14px;
    height: 14px;
    position: absolute;
    right: 15px;
    top: calc(50% - 8px);
    transform: rotate(180deg);
  }

  ${(props) =>
    !props.open &&
    css`
      &:after {
        transform: rotate(0deg);
      }
      &:hover {
        filter: brightness(0.95);
      }
    `}
`;

const StyledDropdown = styled(GridContainer)`
  z-index: 1;
  position: absolute;
  top: 100%;
  background-color: ${white};
  border: 1px solid ${black};
  border-top: none;
  width: 100%;
  right: -1px;

  > div {
    transition: background-color ease-in-out 0.2s;
    ${padding}
    &:hover {
      background-color: ${darkOrange};
    }
  }
`;

interface SelectProps {
  label?: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
}

const Select: FC<SelectProps> = ({ label, options, onSelect, placeholder }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <SelectContainer rowGap="small">
      {label && <StyledText>{label}</StyledText>}
      <StyledSelect
        open={isSelectOpen}
        onClick={() => setIsSelectOpen(!isSelectOpen)}
      >
        {selectedIndex === null ? (
          <StyledText opaque>{placeholder}</StyledText>
        ) : (
          <StyledText>{options[selectedIndex]}</StyledText>
        )}
        {isSelectOpen && (
          <StyledDropdown>
            {options.map((opt, index) => (
              <StyledText
                key={idGenerator()}
                onClick={(e: SyntheticEvent) => {
                  setSelectedIndex(index);
                  if (onSelect && e.currentTarget.textContent) {
                    onSelect(e.currentTarget.textContent);
                  }
                }}
              >
                {opt}
              </StyledText>
            ))}
          </StyledDropdown>
        )}
      </StyledSelect>
    </SelectContainer>
  );
};

export default Select;
