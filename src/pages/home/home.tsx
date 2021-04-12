import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import usePlacesAutocomplete from "use-places-autocomplete";
import idGenerator from "react-id-generator";
import ReCAPTCHA from "react-google-recaptcha";
import { blackTransparent, cream, darkOrange, white } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Input from "../../common/input";
import StyledText from "../../common/styled-text";
import {
  bigBottomMargin,
  bigBottomPadding,
  bigMargin,
  bigPadding,
  mediumPadding,
  padding,
} from "../../css-constants";
import logoWithText from "../../images/logo-text.png";
import { AllFormData } from "../../App.types";
import { mobile, desktop, tablet } from "../../util/responsive";

const UserFormContainer = styled(GridContainer)`
  transition: 0.5s ease-in-out;
  ${mobile`
    ${mediumPadding}
  `}

  ${desktop`
    ${bigPadding}
    ${bigMargin}
    justify-content: flex-start;
  `}
`;

const HomeContainer = styled(GridContainer)`
  min-height: 75vh;
  background-color: ${cream};

  ${mobile`
      ${padding}
  `}

  ${desktop`
    ${bigPadding}
  `}
`;

const LogoImage = styled.img`
  width: 276px;
  ${bigBottomMargin}
`;

const SuggestionsContainer = styled(GridContainer)`
  position: absolute;
  width: 400px;
  max-width: 100%;
  top: 100%;
  box-shadow: 0px 1px 5px ${blackTransparent};
`;

const Suggestion = styled(GridContainer)`
  ${padding}
  background-color: ${white};
`;

const FormContainer = styled(GridContainer)`
  position: relative;

  ${mobile`
    grid-template-columns: 1fr 20%;
    width: 100%;
  `}

  ${tablet`
    grid-template-columns: 400px auto auto;
    width: auto;
  `}
`;

const HeaderTextContainer = styled(GridContainer)`
  ${mobile`
    grid-template-columns: auto;
    text-align: center;
  `}

  ${desktop`
    grid-template-columns: repeat(3, auto);
  `}
`;

const SubmitButton = styled(Button)`
  ${mobile`
    grid-column: 1 / 3;
    text-align: center;
  `}

  ${tablet`
    grid-column: auto;
    text-align: unset;
  `}
`;

const TextContainer = styled(GridContainer)`
  border-bottom: 1px solid ${darkOrange};
  ${bigBottomPadding}
`;

interface HomeProps {
  setFormData: Dispatch<SetStateAction<AllFormData>>;
  formData: AllFormData;
}

const Home: FC<HomeProps> = ({ setFormData, formData }) => {
  const history = useHistory();

  /* 
  
    Track the user form with a ref so we can scroll it into view
  
  */
  const userFormRef = useRef<HTMLDivElement>(null);

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
  
    Load in a custom hook to interact with Google Places API
  
  */
  const {
    ready,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 1000, callbackName: "initMap" });

  /* 
  
    Destructure form data
  
  */
  const {
    address,
    unit,
    firstName,
    lastName,
    email,
    phone,
    recaptcha,
  } = formData;

  /* 
  
    Keep track of the input data
  
  */
  const [addressInputValue, setAddressInputValue] = useState<string | null>(
    address || null
  );

  const [unitInputValue, setUnitInputValve] = useState<string | null>(
    unit || null
  );

  /* 
  
    Keep track if we want to display a recaptcha error
  
  */
  const [recaptchaError, setRecaptchaError] = useState<boolean>(false);

  /* 
    
    Keep track of wether we encountered an error with Followup Boss
  
  */
  const [followupBossError, setFollowupBossError] = useState<boolean>(false);

  /* 
  
    Keep track of wether the user form is visible
    Should only be visible is address is valid
  
  */
  const [userFormVisible, setUserFormVisible] = useState<boolean>(false);

  /* 

    Keep track of wether the form input is valid
  
  */
  const formIsValid = !!(
    firstName &&
    lastName &&
    email &&
    phone &&
    recaptcha &&
    validateEmail(email) &&
    validatePhone(phone) &&
    !recaptchaError &&
    !followupBossError
  );

  /* 
    
      Render the header text

  */
  const renderHeaderText = () => (
    <HeaderTextContainer columns="repeat(3, auto)">
      <StyledText size="h1" bold>
        How much is your home
      </StyledText>
      <StyledText bold size="h1" italic color="lightOrange">
        &nbsp;really&nbsp;
      </StyledText>
      <StyledText size="h1" bold>
        worth?
      </StyledText>
    </HeaderTextContainer>
  );

  /* 
  
    Render the form for the address and unit number
  
  */
  const renderAddressForm = () => (
    <FormContainer columnGap="small" rowGap="small">
      <GridContainer>
        <Input
          disabled={!ready || userFormVisible}
          placeholder="Enter your address"
          onChange={(val) => {
            setAddressInputValue(val);
            setValue(val);

            // If the user changes the input after selecting a valid address, remove the valid address so they cant proceed with gibberish
            if (address) {
              setFormData({ ...formData, address: null });
            }
          }}
          value={addressInputValue}
        />
      </GridContainer>

      <Input
        disabled={userFormVisible}
        placeholder="Unit #"
        onChange={(val) => {
          setUnitInputValve(val);
          setFormData({ ...formData, unit: val });
        }}
        value={unitInputValue}
      />

      {/* Suggestions */}
      <SuggestionsContainer>
        {data.map((suggestion) => (
          <Suggestion
            key={idGenerator()}
            onClick={() => {
              setFormData({ ...formData, address: suggestion.description });
              setAddressInputValue(suggestion.description);
              clearSuggestions();
            }}
            columns="auto auto"
            columnGap="small"
          >
            {suggestion.description}
          </Suggestion>
        ))}
      </SuggestionsContainer>

      <SubmitButton
        disabled={!address || userFormVisible}
        onClick={() => {
          if (address && !userFormVisible) {
            setUserFormVisible(true);
          }
        }}
      >
        Submit
      </SubmitButton>
    </FormContainer>
  );

  /* 
  
    Function that will run when the form is submitted
  
  */
  const handleFormSubmit = async () => {
    // Check that the recaptcha is valid
    try {
      const captchaResp = await fetch(
        "https://api.torontohomevalue.ca/recaptcha",
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
        "https://api.torontohomevalue.ca/followup-boss",
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
  
    Render inputs for the user form
  
  */
  /* 
  
    Render the form selects
  
  */
  const renderUserFormInputs = () => (
    <GridContainer rowGap="small" justifyItems="stretch" columns="1fr">
      <Input
        value={firstName}
        label="First name *"
        onChange={(val) => setFormData({ ...formData, firstName: val })}
        placeholder="Type your first name..."
      />
      <Input
        value={lastName}
        label="Last name *"
        onChange={(val) => setFormData({ ...formData, lastName: val })}
        placeholder="Type your last name..."
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
  
    Render a form for the user info that used to be on /step-3
  
  */
  const renderUserForm = () => (
    <div ref={userFormRef}>
      <UserFormContainer alignContent="flex-start" rowGap="big">
        <TextContainer>
          <StyledText size="h3">Where should we send your estimate?</StyledText>
        </TextContainer>
        {renderUserFormInputs()}
      </UserFormContainer>
    </div>
  );

  useEffect(() => {
    if (userFormVisible) {
      window.scrollTo({
        top: userFormRef.current?.offsetTop,
        behavior: "smooth",
      });
    }
  }, [userFormVisible]);

  return (
    <HomeContainer
      justifyItems="center"
      alignContent="flex-start"
      rowGap="medium"
    >
      <LogoImage src={logoWithText} />
      {renderHeaderText()}
      {renderAddressForm()}
      <StyledText>Receive an accurate estimate in minutes.</StyledText>
      {userFormVisible && renderUserForm()}
    </HomeContainer>
  );
};

export default Home;
