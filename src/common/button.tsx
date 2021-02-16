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
  }

  &:hover {
    background-color: ${lightOrange};
  }

  ${(props) =>
    props.disabled &&
    css`
      filter: opacity(50%);
      cursor: not-allowed;

      &:hover,
      &:active {
        background-color: ${white};
      }
    `}

  ${(props) =>
    props.justifySelf &&
    css`
      justify-self: ${props.justifySelf};
    `}
`;

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  disabled?: boolean;
  justifySelf?: "flex-start";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  disabled,
  justifySelf,
}) => (
  <StyledButton
    className={className}
    onClick={() => (onClick ? onClick() : null)}
    disabled={disabled}
    justifySelf={justifySelf}
  >
    {children}
  </StyledButton>
);

export default Button;
