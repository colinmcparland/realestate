import React, { Dispatch, FC, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AllFormData } from "../../App.types";
import { cream, darkOrange } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Input from "../../common/input";
import Sidebar from "../../common/sidebar";
import StepCounter from "../../common/step-counter";
import StyledText from "../../common/styled-text";
import { bigMargin, bigPadding, bigBottomPadding } from "../../css-constants";

const Step3Container = styled(GridContainer)`
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

interface Step3Props {
  formData: AllFormData;
  setFormData: Dispatch<SetStateAction<AllFormData>>;
}

const Step3: FC<Step3Props> = ({ formData, setFormData }) => {
  const history = useHistory();

  /* 
  
    Destructure form data
  
  */
  const { name, email, phone, address } = formData;

  /* 
  
    Validate email
  
  */
  const validateEmail = (emailToCheck: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailToCheck).toLowerCase());
  };

  /* 
  
    Validate phone #
  
  */
  const validatePhone = (phoneToCheck: string) => {
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return re.test(String(phoneToCheck).toLowerCase());
  };

  /* 

    Keep track of wether the form is valid
  
  */
  const formIsValid = !!(
    name &&
    email &&
    phone &&
    validateEmail(email) &&
    validatePhone(phone)
  );

  /* 
  
    Render the text for under the progress dots
  
  */
  const renderText = () => (
    <TextContainer>
      <StyledText size="h3">Where should we send your estimate?</StyledText>
    </TextContainer>
  );

  /* 
  
    Render the form selects
  
  */
  const renderInputs = () => (
    <GridContainer rowGap="small" justifyItems="stretch" columns="1fr">
      <Input
        value={name}
        label="Full name *"
        onChange={(val) => setFormData({ ...formData, name: val })}
        placeholder="Type your name..."
      />
      <Input
        value={email}
        label="Email address *"
        onChange={(val) => setFormData({ ...formData, email: val })}
        placeholder="Type your email..."
      />
      <Input
        value={phone}
        label="Phone number *"
        onChange={(val) => setFormData({ ...formData, phone: val })}
        placeholder="(555) 555-5555"
      />
      <GridContainer justifySelf="flex-start">
        <Button disabled={!formIsValid}>Next</Button>
      </GridContainer>
    </GridContainer>
  );

  /* 
  
    If a user navigates directly to this URL without an address, redirect them home
  
  */

  if (!address) {
    history.replace("/");
  }

  return (
    <Step3Container columns="35% 1fr">
      <Sidebar address={address} />
      <FormContainer
        justifyContent="flex-start"
        alignContent="flex-start"
        rowGap="big"
      >
        <StepCounter step={3} />
        {renderText()}
        {renderInputs()}
      </FormContainer>
    </Step3Container>
  );
};

export default Step3;
