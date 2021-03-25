import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import usePlacesAutocomplete from "use-places-autocomplete";
import idGenerator from "react-id-generator";
import { blackTransparent, cream, white } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import Input from "../../common/input";
import StyledText from "../../common/styled-text";
import { bigBottomMargin, bigPadding, padding } from "../../css-constants";
import logoWithText from "../../images/logo-text.png";
import { AllFormData } from "../../App.types";
import { mobile, desktop, tablet } from "../../util/responsive";

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

interface HomeProps {
  setFormData: Dispatch<SetStateAction<AllFormData>>;
  formData: AllFormData;
}

const Home: FC<HomeProps> = ({ setFormData, formData }) => {
  const history = useHistory();
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
  const { address, unit } = formData;

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
  const renderForm = () => (
    <FormContainer columnGap="small" rowGap="small">
      <GridContainer>
        <Input
          disabled={!ready}
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
        disabled={!address}
        onClick={() => (address ? history.push("/step-2") : null)}
      >
        Submit
      </SubmitButton>
    </FormContainer>
  );

  return (
    <HomeContainer
      justifyItems="center"
      alignContent="flex-start"
      rowGap="medium"
    >
      <LogoImage src={logoWithText} />
      {renderHeaderText()}
      {renderForm()}
      <StyledText>Receive an accurate estimate in minutes.</StyledText>
    </HomeContainer>
  );
};

export default Home;
