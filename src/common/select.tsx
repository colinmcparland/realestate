import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const StyledSelect = styled.select``;

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {}

const Select: FC<SelectProps> = () => <StyledSelect />;

export default Select;
