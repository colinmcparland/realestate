import React, { FC } from "react";
import styled from "styled-components";
import { cream } from "../../colors";
import GridContainer from "../../common/grid-container";
import StyledText from "../../common/styled-text";
import {
  bigBottomMargin,
  bigBottomPadding,
  bigPadding,
} from "../../css-constants";
import logoWithText from "../../images/logo-text.png";

const HomeContainer = styled(GridContainer)`
  background-color: ${cream};
  ${bigPadding}
`;

const LogoImage = styled.img`
  width: 276px;
  ${bigBottomMargin}
  ${bigBottomPadding}
`;

const Home: FC = () => (
  <HomeContainer justifyItems="center" rowGap="medium">
    <LogoImage src={logoWithText} />
    <GridContainer columns="repeat(3, auto)">
      <StyledText size="h1" bold>
        How much is your home
      </StyledText>
      <StyledText bold size="h1" italic color="lightOrange">
        &nbsp;really&nbsp;
      </StyledText>
      <StyledText size="h1" bold>
        worth?
      </StyledText>
    </GridContainer>
  </HomeContainer>
);

export default Home;
