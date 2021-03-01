import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import { AllFormData } from "../../App.types";
import { cream, darkOrange } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Input from "../../common/input";
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
     justify-content: 
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

interface Step3Props {
  formData: AllFormData;
  setFormData: Dispatch<SetStateAction<AllFormData>>;
}

const Step3: FC<Step3Props> = ({ formData, setFormData }) => {
  const history = useHistory();

  /* 
  
    Destructure form data
  
  */
  const { name, email, phone, address, recaptcha, unit } = formData;

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
  
    Keep track if we want to display a recaptcha error
  
  */
  const [recaptchaError, setRecaptchaError] = useState<boolean>(false);

  /* 
  
    Keep track of wether we encountered an error with Followup Boss
  
  */
  const [followupBossError, setFollowupBossError] = useState<boolean>(false);

  /* 

    Keep track of wether the form is valid
  
  */
  const formIsValid = !!(
    name &&
    email &&
    phone &&
    recaptcha &&
    validateEmail(email) &&
    validatePhone(phone) &&
    !recaptchaError &&
    !followupBossError
  );

  /* 
  
    Function that will run when the form is submitted
  
  */
  const handleFormSubmit = async () => {
    // Check that the recaptcha is valid
    try {
      const captchaResp = await fetch(
        `http://${window.location.hostname}:8080/recaptcha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recaptcha }),
        }
      );

      const captchaResponseBody = await captchaResp.json();

      if (!captchaResponseBody.success) {
        throw new Error(
          JSON.stringify({
            errorSource: "recaptcha",
            errorBody: captchaResponseBody,
          })
        );
      }

      const followupBossResp = await fetch(
        `http://${window.location.hostname}:8080/followup-boss`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        }
      );

      if (followupBossResp.status !== 200) {
        throw new Error(
          JSON.stringify({
            errorSource: "followupBoss",
            errorBody: followupBossResp,
          })
        );
      }

      const followupBossResponseBody = await followupBossResp.json();

      if (followupBossResponseBody.errorMessage) {
        throw new Error(
          JSON.stringify({
            errorSource: "followupBoss",
            errorBody: followupBossResponseBody,
          })
        );
      }

      history.push("/confirm");
    } catch (e) {
      const parsedError = JSON.parse(e);
      const { errorSource } = parsedError || {};

      if (errorSource === "recaptcha") {
        setRecaptchaError(true);
      }

      if (errorSource === "followupBoss") {
        setFollowupBossError(true);
      }
    }
  };

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
      <GridContainer justifySelf="flex-start" rowGap="small">
        <ReCAPTCHA
          sitekey="6Le-nT0aAAAAACTdprtG_gThB68R9nPmr6gQ6SQ8"
          onChange={(val) => setFormData({ ...formData, recaptcha: val })}
        />
        {recaptchaError && (
          <StyledText>
            We had an issue processing your CAPTCHA. Please try again.
          </StyledText>
        )}
        {followupBossError && (
          <StyledText>
            We had an issue submitting your request. Please try again.
          </StyledText>
        )}
        <Button
          onClick={() => (formIsValid ? handleFormSubmit() : null)}
          disabled={!formIsValid}
          justifySelf="flex-start"
        >
          Get Estimate
        </Button>
      </GridContainer>
    </GridContainer>
  );

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
    <TextContainer>
      <StyledText size="h3">Where should we send your estimate?</StyledText>
    </TextContainer>
  );

  return (
    <Step3Container>
      <Sidebar address={address} unit={unit} />
      <FormContainer alignContent="flex-start" rowGap="big">
        <StepCounter step={3} />
        {renderText()}
        {renderInputs()}
      </FormContainer>
    </Step3Container>
  );
};

export default Step3;
