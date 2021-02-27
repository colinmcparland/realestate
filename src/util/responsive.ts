import { css, FlattenSimpleInterpolation } from "styled-components";

const mobileSize = "320px";
const tabletSize = "768px";
const desktopSize = "1024px";

export const mobile = (
  strings: TemplateStringsArray,
  ...rest: FlattenSimpleInterpolation[]
) => css`
  @media screen and (min-width: ${mobileSize}) {
    ${strings}
    ${rest}
  }
`;

export const tablet = (
  strings: TemplateStringsArray,
  ...rest: FlattenSimpleInterpolation[]
) => css`
  @media screen and (min-width: ${tabletSize}) {
    ${strings}
    ${rest}
  }
`;

export const desktop = (
  strings: TemplateStringsArray,
  ...rest: FlattenSimpleInterpolation[]
) => css`
  @media screen and (min-width: ${desktopSize}) {
    ${strings}
    ${rest}
  }
`;
