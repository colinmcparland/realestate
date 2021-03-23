import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AllFormData } from "../../App.types";
import { cream, darkOrange } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Sidebar from "../../common/sidebar";
import StepCounter from "../../common/step-counter";
import StyledText from "../../common/styled-text";
import {
  bigMargin,
  bigPadding,
  bigBottomPadding,
  mediumPadding,
} from "../../css-constants";
import { mobile, desktop } from "../../util/responsive";

const Step3Container = styled(GridContainer)`
  background-color: ${cream};

  ${mobile`
    grid-template-columns: 1fr;
  `}

  ${desktop`
    grid-template-columns: 35% 1fr;
  `}
`;

const FormContainer = styled(GridContainer)`
  ${mobile`
    ${mediumPadding}
  `}

  ${desktop`
    ${bigPadding}
    ${bigMargin}
  `}
`;

const TextContainer = styled(GridContainer)`
  border-bottom: 1px solid ${darkOrange};
  ${bigBottomPadding}
`;

interface ConfirmProps {
  formData: AllFormData;
  setFormData: Dispatch<SetStateAction<AllFormData>>;
}

const Confirm: FC<ConfirmProps> = ({ formData }) => {
  const history = useHistory();

  /* 
  
    Send a conversion event
  
  */
  // const isFirstRender = useRef<boolean>(true);
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     // add script to DOM
  //     const s = document.createElement("script");
  //     s.innerHTML =
  //       "gtag('event', 'conversion', {'send_to': 'AW-410671059/mzeICNPPzfwBENOv6cMB'});";
  //     s.setAttribute("id", "event4");
  //     document.head.appendChild(s);
  //     isFirstRender.current = false;
  //   }

  //   return () => {
  //     const s = document.getElementById("event4");
  //     if (s) {
  //       document.head.removeChild(s);
  //     }
  //   };
  // }, []);

  /* 
  
    Destructure form data
  
  */
  const { address, unit } = formData;

  /* 
  
    Render the text for under the progress dots
  
  */
  const renderText = () => (
    <>
      <TextContainer>
        <StyledText size="h3">Your request has been submitted.</StyledText>
      </TextContainer>
      <GridContainer rowGap="small">
        <StyledText>
          Thanks for submitting your information, our team is already hard at
          work, processing your details. A local property expert will reach out
          to walk you through the process and collect any additional information
          needed to narrow your home valuation.
        </StyledText>

        <StyledText>
          Once you have a home estimate, we will go over your options should you
          be in the market to sell your property.
        </StyledText>

        <StyledText>
          If you need immediate assistance, tap on the button below to connect
          with a local property expert.
        </StyledText>
      </GridContainer>
      <Button
        justifySelf="flex-start"
        onClick={() => window.open("tel:1-647-691-2913")}
      >
        Call Now (647) 691-2913
      </Button>
    </>
  );
  /* 
  
    If a user navigates directly to this URL without an address, redirect them home
  
  */

  if (!address) {
    history.replace("/");
  }

  return (
    <Step3Container>
      <Sidebar address={address} unit={unit} />
      <FormContainer
        justifyContent="flex-start"
        alignContent="flex-start"
        rowGap="big"
      >
        <StepCounter step={3} />
        {renderText()}
      </FormContainer>
    </Step3Container>
  );
};

export default Confirm;
