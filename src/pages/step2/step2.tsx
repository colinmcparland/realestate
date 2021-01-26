import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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
  address: string | null;
}

const Step2: FC<Step2Props> = ({ address }) => {
  const history = useHistory();

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
        options={["Option A", "Option B", "Option C"]}
        placeholder="Select option"
        onSelect={() => {}}
        label="How soon are you looking to sell?"
      />
      <Select
        options={[
          "Needs nothing",
          "Needs a little work",
          "Needs significant work",
          "Tear down",
        ]}
        placeholder="Select option"
        onSelect={() => {}}
        label="What is the condition of your home?"
      />
      <Select
        options={[
          "Single Family Home",
          "Condominium",
          "Townhouse",
          "Multi-Family",
          "Other",
        ]}
        placeholder="Select option"
        onSelect={() => {}}
        label="What type of property is this?"
      />
      <Select
        options={["Yes", "No"]}
        placeholder="Select option"
        onSelect={() => {}}
        label="Are you currently working with an agent?"
      />
      <Button onClick={() => history.push("/step-3")}>Next</Button>
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
