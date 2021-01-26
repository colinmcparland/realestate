import React, { FC } from "react";
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

const HomeContainer = styled(GridContainer)`
  min-height: 75vh;
  background-color: ${cream};
  ${bigPadding}
`;

const LogoImage = styled.img`
  width: 276px;
  ${bigBottomMargin}
`;

const SuggestionsContainer = styled(GridContainer)`
  position: absolute;
  width: 400px;
  top: 100%;
  box-shadow: 0px 1px 5px ${blackTransparent};
`;

const Suggestion = styled(GridContainer)`
  ${padding}
  background-color: ${white};
`;

const FormContainer = styled(GridContainer)`
  position: relative;
`;

interface HomeProps {
  setAddress: (val: string) => void;
  address: string | null;
}

const Home: FC<HomeProps> = ({ setAddress, address }) => {
  const history = useHistory();
  /* 
  
    Load in a custom hook to interact with Google Places API
  
  */
  const {
    ready,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 30, callbackName: "initMap" });

  /* 
    
      Render the header text

  */
  const renderHeaderText = () => (
    <GridContainer columns="repeat(3, auto)">
      <StyledText size="h1" bold>
        How much is your home
      </StyledText>
      <StyledText bold size="h1" italic color="lightOrange">
        &nbsp;really&nbsp;
      </StyledText>
      <StyledText size="h1" bold>
        worth?
      </StyledText>
    </GridContainer>
  );

  /* 
  
    Render the form for the address and unit number
  
  */
  const renderForm = () => (
    <FormContainer columns="400px auto" columnGap="small">
      <GridContainer columns="75% 25%">
        <Input
          disabled={!ready}
          placeholder="Enter your address"
          onChange={(val) => {
            setAddress(val);
            setValue(val);
          }}
          value={address}
        />
        <Input placeholder="Unit #" onChange={() => {}} />
      </GridContainer>

      {/* Suggestions */}
      <SuggestionsContainer>
        {data.map((suggestion) => (
          <Suggestion
            key={idGenerator()}
            onClick={() => {
              setAddress(suggestion.description);
              clearSuggestions();
            }}
            columns="auto auto"
            columnGap="small"
          >
            {suggestion.description}
          </Suggestion>
        ))}
      </SuggestionsContainer>

      <Button
        disabled={!address}
        onClick={() => (address ? history.push("/step-2") : null)}
      >
        Submit
      </Button>
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
