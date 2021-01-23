import React, { FC, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import GridContainer from "./common/grid-container";
import StyledText from "./common/styled-text";
import { mediumPadding } from "./css-constants";
import Home from "./pages/home/home";

const FooterContainer = styled(GridContainer)`
  ${mediumPadding}
`;

const App: FC = () => {
  /* 
  
    Keep track of the address the users enters into the form
  
  */
  const [address, setAddress] = useState<string | null>(null);

  /* 
 
    Render the footer
 
 */
  const renderFooter = () => (
    <FooterContainer
      rowGap="small"
      justifyContent="center"
      justifyItems="center"
    >
      <StyledText size="small">Contact information for John Doe</StyledText>
      <GridContainer columns="repeat(3, auto)" columnGap="small">
        <StyledText size="small">(555) 555 5555</StyledText>
        <StyledText size="small">email@email.com</StyledText>
        <StyledText size="small">@socialmedia</StyledText>
      </GridContainer>
      <StyledText size="small">&copy; {new Date().getFullYear()}</StyledText>
    </FooterContainer>
  );
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <Home setAddress={setAddress} address={address} />
          </Route>
        </Switch>
      </Router>
      {renderFooter()}
    </>
  );
};

export default App;
