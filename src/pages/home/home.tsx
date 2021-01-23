import React, { FC } from "react";
import styled from "styled-components";
import { cream } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Input from "../../common/input";
import StyledText from "../../common/styled-text";
import { bigBottomMargin, bigPadding } from "../../css-constants";
import logoWithText from "../../images/logo-text.png";

const HomeContainer = styled(GridContainer)`
  min-height: 75vh;
  background-color: ${cream};
  ${bigPadding}
`;

const LogoImage = styled.img`
  width: 276px;
  ${bigBottomMargin}
`;

interface HomeProps {
  setAddress: (val: string) => void;
  address: string | null;
}

const Home: FC<HomeProps> = ({ setAddress, address }) => {
  /* 
    
      Render the header text

  */
  const renderHeaderText = () => (
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
  );

  /* 
  
    Render the form for the address and unit number
  
  */
  const renderForm = () => (
    <GridContainer columns="400px auto" columnGap="small">
      <GridContainer columns="75% 25%">
        <Input
          placeholder="Enter your address"
          onChange={(val) => setAddress(val)}
        />
        <Input placeholder="Unit #" onChange={(val) => setAddress(val)} />
      </GridContainer>

      <Button disabled={!address}>Submit</Button>
    </GridContainer>
  );

  return (
    <HomeContainer
      justifyItems="center"
      alignContent="flex-start"
      rowGap="medium"
    >
      <LogoImage src={logoWithText} />
      {renderHeaderText()}
      {renderForm()}
      <StyledText>Receive an accurate estimate in minutes.</StyledText>
    </HomeContainer>
  );
};

export default Home;
