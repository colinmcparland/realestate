import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AllFormData } from "../../App.types";
import { cream, darkOrange } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Select from "../../common/select";
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

const Step2Container = styled(GridContainer)`
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
    justify-content: flex-start;
  `}
`;

const TextContainer = styled(GridContainer)`
  border-bottom: 1px solid ${darkOrange};
  ${bigBottomPadding}
`;

interface Step2Props {
  formData: AllFormData;
  setFormData: Dispatch<SetStateAction<AllFormData>>;
}

const Step2: FC<Step2Props> = ({ formData, setFormData }) => {
  const history = useHistory();

  /* 
  
    Destructure form data
  
  */
  const {
    address,
    howSoon,
    condition,
    propertyType,
    workingWithAgent,
    unit,
  } = formData;

  /* 
  
    Keep track of wether the form is validated
  
  */
  const isFormValid = !!(
    howSoon &&
    condition &&
    propertyType &&
    workingWithAgent
  );

  /* 
  
    Choices for the select menus

  */
  const howSoonChoices = [
    "Within 30 Days",
    "Within 3 months",
    "Within 6 months",
    "Within 1 year",
    "Over a year",
  ];

  const conditionChoices = [
    "Needs nothing",
    "Needs a little work",
    "Needs significant work",
    "Tear down",
  ];

  const propertyTypeChoices = [
    "Single Family Home",
    "Condominium",
    "Townhouse",
    "Multi-Family",
    "Other",
  ];

  const agentChoices = ["Yes", "No"];

  /* 
  
    Function to check if the selects have an option selected initially.
    Will improve UI if the user goes back from step 3 to step 2, so the selects will maintain their original value
  
  */
  const isOptionSelected = (option: string | null, choices: string[]) =>
    option && choices.indexOf(option) > -1 ? choices.indexOf(option) : null;

  /* 
  
    Send a conversion event
  
  */
  // const isFirstRender = useRef<boolean>(true);
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     // add script to DOM
  //     const s = document.createElement("script");
  //     s.innerHTML =
  //       "gtag('event', 'conversion', {'send_to': 'AW-410671059/l47VCPDLzfwBENOv6cMB'});";
  //     s.setAttribute("id", "event2");
  //     document.head.appendChild(s);
  //     isFirstRender.current = false;
  //   }

  //   return () => {
  //     const s = document.getElementById("event2");
  //     if (s) {
  //       document.head.removeChild(s);
  //     }
  //   };
  // }, []);

  /* 
  
    If a user navigates directly to this URL without an address, redirect them home
  
  */
  if (!address) {
    history.replace("/");
  }

  /* 
  
    Render the text for under the progress dots
  
  */
  const renderText = () => (
    <TextContainer rowGap="small">
      <StyledText size="h3">To help us determine your estimate,</StyledText>
      <StyledText size="h3">please provide us with some more info.</StyledText>
    </TextContainer>
  );

  /* 
  
    Render the form selects
  
  */
  const renderSelects = () => (
    <GridContainer rowGap="small" justifyItems="flex-start" columns="1fr">
      <Select
        options={howSoonChoices}
        placeholder="Select option"
        onSelect={(val) => setFormData({ ...formData, howSoon: val })}
        label="How soon are you looking to sell?"
        initialIndex={isOptionSelected(howSoon, howSoonChoices)}
      />
      <Select
        options={conditionChoices}
        placeholder="Select option"
        onSelect={(val) => setFormData({ ...formData, condition: val })}
        label="What is the condition of your home?"
        initialIndex={isOptionSelected(condition, conditionChoices)}
      />
      <Select
        options={propertyTypeChoices}
        placeholder="Select option"
        onSelect={(val) => setFormData({ ...formData, propertyType: val })}
        label="What type of property is this?"
        initialIndex={isOptionSelected(propertyType, propertyTypeChoices)}
      />
      <Select
        options={agentChoices}
        placeholder="Select option"
        onSelect={(val) => setFormData({ ...formData, workingWithAgent: val })}
        label="Are you currently working with an agent?"
        initialIndex={isOptionSelected(workingWithAgent, agentChoices)}
      />
      <Button
        disabled={!isFormValid}
        onClick={() => (isFormValid ? history.push("/step-3") : null)}
      >
        Next
      </Button>
    </GridContainer>
  );

  return (
    <Step2Container>
      <Sidebar address={address} unit={unit} />
      <FormContainer alignContent="flex-start" rowGap="big">
        <StepCounter step={2} />
        {renderText()}
        {renderSelects()}
      </FormContainer>
    </Step2Container>
  );
};

export default Step2;
