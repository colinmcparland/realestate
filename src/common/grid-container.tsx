import React, { FC, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import {
  bigVerticalGridGap,
  mediumVerticalGridGap,
  verticalGridGap,
} from "../css-constants";

const StyledGridContainer = styled.div<GridContainerProps>`
  display: grid;

  ${(props) =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `}

  ${(props) =>
    props.justifyItems &&
    css`
      justify-items: ${props.justifyItems};
    `}

    ${(props) =>
    props.rowGap &&
    props.rowGap === "small" &&
    css`
      ${verticalGridGap}
    `}

    ${(props) =>
    props.rowGap &&
    props.rowGap === "medium" &&
    css`
      ${mediumVerticalGridGap}
    `}

    ${(props) =>
    props.rowGap &&
    props.rowGap === "big" &&
    css`
      ${bigVerticalGridGap}
    `}

    ${(props) =>
    props.columns &&
    css`
      grid-template-columns: ${props.columns};
    `}
`;

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
  justifyContent?: "flex-start" | "flex-end" | "center";
  justifyItems?: "flex-start" | "flex-end" | "center";
  rowGap?: "small" | "medium" | "big";
  columns?: string;
}

const GridContainer: FC<GridContainerProps> = ({
  children,
  className,
  justifyContent,
  justifyItems,
  rowGap,
  columns,
}) => {
  return (
    <StyledGridContainer
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      className={className}
      rowGap={rowGap}
      columns={columns}
    >
      {children}
    </StyledGridContainer>
  );
};

export default GridContainer;
