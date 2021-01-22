import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { black, darkOrange, lightOrange } from "../colors";
import { mediumPadding } from "../css-constants";

const StyledButton = styled.div`
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
`;

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, className, onClick }) => (
  <StyledButton
    className={className}
    onClick={() => (onClick ? onClick() : null)}
  >
    {children}
  </StyledButton>
);

export default Button;
