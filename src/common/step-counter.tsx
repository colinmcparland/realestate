import React, { FC } from "react";
import styled, { css } from "styled-components";
import idGenerator from "react-id-generator";
import { darkOrange } from "../colors";
import { bigRightPadding } from "../css-constants";
import GridContainer from "./grid-container";
import StyledText from "./styled-text";

const StepCounterContainer = styled(GridContainer)`
  position: relative;
`;

interface StepProps {
  active: boolean;
}

const Step = styled(GridContainer)<StepProps>`
  width: 37px;
  height: 37px;
  border-radius: 37px;
  background-color: ${darkOrange};
  z-index: 2;

  ${(props) =>
    !props.active &&
    css`
      filter: opacity(50%);
    `}
`;

const StepContainer = styled(GridContainer)`
  position: relative;
  overflow: hidden;

  &:not(:last-child) {
    ${bigRightPadding}
    &:after {
      content: "";
      position: absolute;
      left: 37px;
      top: calc(50% - 2px);
      width: calc(100% - 37px);
      border: 2px dashed ${darkOrange};
    }
  }
`;

interface StepCounterProps {
  step: 2 | 3;
}

const StepCounter: FC<StepCounterProps> = ({ step }) => (
  <StepCounterContainer columns="repeat(3, auto)" justifyContent="flex-start">
    {new Array(3).fill(0).map((_, index) => (
      <StepContainer key={idGenerator()}>
        <Step
          alignContent="center"
          justifyContent="center"
          active={index < step}
        >
          <StyledText size="h4" color="white">
            {index + 1}
          </StyledText>
        </Step>
      </StepContainer>
    ))}
  </StepCounterContainer>
);

export default StepCounter;
