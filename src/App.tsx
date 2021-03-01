import React, { FC, useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import { AllFormData } from "./App.types";
import Footer from "./common/footer";
import GridContainer from "./common/grid-container";
import Confirm from "./pages/confirm/confirm";
import Home from "./pages/home/home";
import PrivacyPolicy from "./pages/privacy-policy/privacy-policy";
import Step2 from "./pages/step2/step2";
import Step3 from "./pages/step3/step3";
import TermsOfService from "./pages/terms-of-service/terms-of-service";

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

  return (
    <Router>
      <PageContainer>
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
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route path="/terms-of-service">
            <TermsOfService />
          </Route>
          <Route path="/">
            <Home setFormData={setFormData} formData={formData} />
          </Route>
        </Switch>
      </PageContainer>
      <Footer />
    </Router>
  );
};

export default App;
