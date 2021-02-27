import React, { FC, useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import { AllFormData } from "./App.types";
import GridContainer from "./common/grid-container";
import StyledText from "./common/styled-text";
import { mediumPadding } from "./css-constants";
import Confirm from "./pages/confirm/confirm";
import Home from "./pages/home/home";
import Step2 from "./pages/step2/step2";
import Step3 from "./pages/step3/step3";
import { mobile, tablet } from "./util/responsive";

const FooterContainer = styled(GridContainer)`
  ${mediumPadding}
`;

const PageContainer = styled(GridContainer)`
  min-height: 95vh;
`;

const FooterMetaContainer = styled(GridContainer)`
  ${mobile`
    grid-template-columns: 1fr;
  `}

  ${tablet`
    grid-template-columns: repeat(3, 1fr);
  `}
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
  
    Keep track of all the data the users enters into the forms
  
  */
  const [formData, setFormData] = useState<AllFormData>({
    address: null,
    unit: null,
    howSoon: null,
    condition: null,
    propertyType: null,
    workingWithAgent: null,
    name: null,
    email: null,
    phone: null,
    recaptcha: null,
  });

  /* 
 
    Render the footer
 
  */
  const renderFooter = () => (
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
        <StyledText size="small">@homevaluetoronto</StyledText>
      </FooterMetaContainer>
      <StyledText size="small">&copy; {new Date().getFullYear()}</StyledText>
    </FooterContainer>
  );
  return (
    <>
      <PageContainer>
        <Router>
          <Switch>
            <Route path="/step-2">
              <Step2 formData={formData} setFormData={setFormData} />
            </Route>
            <Route path="/step-3">
              <Step3 formData={formData} setFormData={setFormData} />
            </Route>
            <Route path="/confirm">
              <Confirm formData={formData} setFormData={setFormData} />
            </Route>
            <Route path="/">
              <Home setFormData={setFormData} formData={formData} />
            </Route>
          </Switch>
        </Router>
      </PageContainer>
      {renderFooter()}
    </>
  );
};

export default App;
