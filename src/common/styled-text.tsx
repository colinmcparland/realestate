import React, { FC, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { cream, darkOrange, lightOrange } from "../colors";

const Text = styled.div<StyledTextProps>`
  font-size: 17px;
  font-weight: 300;

  ${(props) =>
    props.size &&
    props.size === "h1" &&
    css`
      font-size: 50px;
    `}
  ${(props) =>
    props.size &&
    props.size === "h2" &&
    css`
      font-size: 40px;
    `}
    ${(props) =>
    props.size &&
    props.size === "h3" &&
    css`
      font-size: 26px;
    `}
    ${(props) =>
    props.size &&
    props.size === "h4" &&
    css`
      font-size: 20px;
    `}
    ${(props) =>
    props.size &&
    props.size === "small" &&
    css`
      font-size: 14px;
    `}
    ${(props) =>
    props.bold &&
    css`
      font-weight: 700;
    `}

  ${(props) =>
    props.color &&
    props.color === "cream" &&
    css`
      color: ${cream};
    `}

  ${(props) =>
    props.color &&
    props.color === "lightOrange" &&
    css`
      color: ${lightOrange};
    `}

  ${(props) =>
    props.color &&
    props.color === "darkOrange" &&
    css`
      color: ${darkOrange};
    `}

  ${(props) =>
    props.italic &&
    css`
      font-style: italic;
    `}
`;

interface StyledTextProps extends HTMLAttributes<HTMLDivElement> {
  size?: "h1" | "h2" | "h3" | "h4" | "small";
  bold?: boolean;
  color?: "cream" | "lightOrange" | "darkOrange";
  italic?: boolean;
}

const StyledText: FC<StyledTextProps> = ({
  size,
  children,
  className,
  bold,
  color,
  italic,
}) => (
  <Text
    size={size}
    color={color}
    italic={italic}
    className={className}
    bold={bold}
  >
    {children}
  </Text>
);

export default StyledText;
