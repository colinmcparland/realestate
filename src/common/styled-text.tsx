import React, { FC, HTMLAttributes, SyntheticEvent } from "react";
import styled, { css } from "styled-components";
import {
  cream,
  darkOrange,
  lightOrange,
  white,
  whiteTransparent,
} from "../colors";

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
    props.color === "white" &&
    css`
      color: ${white};
    `}

  ${(props) =>
    props.color &&
    props.color === "whiteTransparent" &&
    css`
      color: ${whiteTransparent};
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

  ${(props) =>
    props.opaque &&
    css`
      filter: opacity(50%);
    `}
    
  ${(props) =>
    props.cursor &&
    props.cursor === "pointer" &&
    css`
      cursor: pointer;
    `}
`;

interface StyledTextProps
  extends Pick<HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  size?: "h1" | "h2" | "h3" | "h4" | "small";
  bold?: boolean;
  color?: "cream" | "lightOrange" | "darkOrange" | "white" | "whiteTransparent";
  italic?: boolean;
  opaque?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  cursor?: "pointer";
}

const StyledText: FC<StyledTextProps> = ({
  size,
  children,
  className,
  bold,
  color,
  italic,
  opaque,
  onClick,
  cursor,
}) => (
  <Text
    size={size}
    color={color}
    italic={italic}
    className={className}
    bold={bold}
    opaque={opaque}
    onClick={(e: SyntheticEvent) => (onClick ? onClick(e) : null)}
    cursor={cursor}
  >
    {children}
  </Text>
);

export default StyledText;
