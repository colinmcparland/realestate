import React, { FC, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { black, darkOrange, lightOrange, white } from "../colors";
import { mediumPadding } from "../css-constants";

const StyledButton = styled.div<ButtonProps>`
  ${mediumPadding}
  border: 1px solid ${black};
  cursor: pointer;
  transition: background-color ease-in-out 0.2s;

  /* Force a light font weight */
  * {
    font-weight: 300;
  }

  /* Force heavy font weights on hover and active states */
  &:active {
    background-color: ${darkOrange};
    -webkit-text-stroke: thick;
  }

  &:hover {
    background-color: ${lightOrange};
    -webkit-text-stroke: thick;
  }

  ${(props) =>
    props.disabled &&
    css`
      filter: opacity(50%);
      cursor: not-allowed;

      &:hover,
      &:active {
        background-color: ${white};
        -webkit-text-stroke: unset;
      }
    `}
`;

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  disabled,
}) => (
  <StyledButton
    className={className}
    onClick={() => (onClick ? onClick() : null)}
    disabled={disabled}
  >
    {children}
  </StyledButton>
);

export default Button;
