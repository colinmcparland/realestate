import React, { FC, useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import GridContainer from "./common/grid-container";
import StyledText from "./common/styled-text";
import { mediumPadding } from "./css-constants";
import Home from "./pages/home/home";
import Step2 from "./pages/step2/step2";

const FooterContainer = styled(GridContainer)`
  ${mediumPadding}
`;

const PageContainer = styled(GridContainer)`
  min-height: 95vh;
`;

const App: FC = () => {
  /* 
  
    Add the external Google Places API script
  
  */
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const script = document.createElement("script");

      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAbdl8bckQGEC3FriXGPaYQ5ts2eam5Lbw&libraries=places&callback=initMap";

      document.body.appendChild(script);
    }
  }, []);
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
      <PageContainer>
        <Router>
          <Switch>
            <Route path="/step-2">
              <Step2 />
            </Route>
            <Route path="/">
              <Home setAddress={setAddress} address={address} />
            </Route>
          </Switch>
        </Router>
      </PageContainer>
      {renderFooter()}
    </>
  );
};

export default App;
