import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { mediumPadding } from "../css-constants";
import { mobile, tablet } from "../util/responsive";
import GridContainer from "./grid-container";
import StyledText from "./styled-text";

const FooterContainer = styled(GridContainer)`
  ${mediumPadding}
`;
const FooterMetaContainer = styled(GridContainer)`
  ${mobile`
    grid-template-columns: 1fr;
  `}

  ${tablet`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const Footer: FC = () => {
  const history = useHistory();

  return (
    <FooterContainer
      rowGap="small"
      justifyContent="center"
      justifyItems="center"
    >
      <StyledText size="small">
        Contact information for Toronto Home Value
      </StyledText>
      <FooterMetaContainer
        justifyItems="center"
        rowGap="small"
        columns="repeat(3, auto)"
        columnGap="small"
      >
        <StyledText
          onClick={() => window.open("tel:1-647-691-2913")}
          size="small"
          cursor="pointer"
        >
          (647) 691-2913
        </StyledText>
        <StyledText
          size="small"
          cursor="pointer"
          onClick={() => window.open("mailto:info@torontohomevalue.ca")}
        >
          info@torontohomevalue.ca
        </StyledText>
        <StyledText
          cursor="pointer"
          onClick={() =>
            window.open("https://www.facebook.com/homevaluetoronto")
          }
          size="small"
        >
          @homevaluetoronto
        </StyledText>
      </FooterMetaContainer>
      <GridContainer columns="auto auto" columnGap="small" rowGap="small">
        <StyledText
          cursor="pointer"
          size="small"
          onClick={() => history.push("/privacy-policy")}
        >
          Privacy Policy
        </StyledText>
        <StyledText
          cursor="pointer"
          size="small"
          onClick={() => history.push("/terms-of-service")}
        >
          Terms of Service
        </StyledText>
      </GridContainer>
      <StyledText size="small">&copy; {new Date().getFullYear()}</StyledText>
    </FooterContainer>
  );
};

export default Footer;
