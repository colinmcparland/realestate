import React, { Dispatch, FC, SetStateAction } from "react";
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
import { bigMargin, bigPadding, bigBottomPadding } from "../../css-constants";

const Step2Container = styled(GridContainer)`
  background-color: ${cream};
`;

const FormContainer = styled(GridContainer)`
  ${bigPadding}
  ${bigMargin}
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
  
    Render the text for under the progress dots
  
  */
  const renderText = () => (
    <TextContainer rowGap="small">
      <StyledText size="h3">To help us determine your estimate,</StyledText>
      <StyledText size="h3">please provide us with some more info.</StyledText>
    </TextContainer>
  );

  /* 
  
    Function to check if the selects have an option selected initially.
    Will improve UI if the user goes back from step 3 to step 2, so the selects will maintain their original value
  
  */
  const isOptionSelected = (option: string | null, choices: string[]) =>
    option && choices.indexOf(option) > -1 ? choices.indexOf(option) : null;

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

  /* 
  
    If a user navigates directly to this URL without an address, redirect them home
  
  */
  if (!address) {
    history.replace("/");
  }

  return (
    <Step2Container columns="35% 1fr">
      <Sidebar address={address} />
      <FormContainer
        justifyContent="flex-start"
        alignContent="flex-start"
        rowGap="big"
      >
        <StepCounter step={2} />
        {renderText()}
        {renderSelects()}
      </FormContainer>
    </Step2Container>
  );
};

export default Step2;
