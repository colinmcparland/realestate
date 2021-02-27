import React, { FC, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import {
  bigHorizontalGridGap,
  bigVerticalGridGap,
  horizontalGridGap,
  mediumHorizontalGridGap,
  mediumVerticalGridGap,
  verticalGridGap,
} from "../css-constants";

const StyledGridContainer = styled.div<GridContainerProps>`
  display: grid;
  box-sizing: border-box;

  ${(props) =>
    props.justifySelf &&
    css`
      justify-self: ${props.justifySelf};
    `}

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
    props.alignContent &&
    css`
      align-content: ${props.alignContent};
    `}

  ${(props) =>
    props.alignItems &&
    css`
      align-content: ${props.alignItems};
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
    props.columnGap &&
    props.columnGap === "small" &&
    css`
      ${horizontalGridGap}
    `}

    ${(props) =>
    props.columnGap &&
    props.columnGap === "medium" &&
    css`
      ${mediumHorizontalGridGap}
    `}

    ${(props) =>
    props.columnGap &&
    props.columnGap === "big" &&
    css`
      ${bigHorizontalGridGap}
    `}

    ${(props) =>
    props.columns &&
    css`
      grid-template-columns: ${props.columns};
    `}
`;

type FlexProps = "flex-start" | "flex-end" | "center" | "stretch";
type SizeProps = "small" | "medium" | "big";

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
  justifyContent?: FlexProps;
  justifyItems?: FlexProps;
  alignContent?: FlexProps;
  alignItems?: FlexProps;
  rowGap?: SizeProps;
  columnGap?: SizeProps;
  columns?: string;
  onClick?: () => void;
  justifySelf?: FlexProps;
}

const GridContainer: FC<GridContainerProps> = ({
  children,
  className,
  justifyContent,
  justifyItems,
  rowGap,
  columns,
  columnGap,
  alignContent,
  onClick,
  justifySelf,
}) => {
  return (
    <StyledGridContainer
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      className={className}
      rowGap={rowGap}
      columns={columns}
      columnGap={columnGap}
      alignContent={alignContent}
      onClick={() => (onClick ? onClick() : null)}
      justifySelf={justifySelf}
    >
      {children}
    </StyledGridContainer>
  );
};

export default GridContainer;
