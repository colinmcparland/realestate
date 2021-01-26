import React, { Dispatch, FC, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AllFormData } from "../../App.types";
import { cream, darkOrange } from "../../colors";
import GridContainer from "../../common/grid-container";
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

interface ConfirmProps {
  formData: AllFormData;
  setFormData: Dispatch<SetStateAction<AllFormData>>;
}

const Confirm: FC<ConfirmProps> = ({ formData }) => {
  const history = useHistory();

  /* 
  
    Destructure form data
  
  */
  const { address } = formData;

  /* 
  
    Render the text for under the progress dots
  
  */
  const renderText = () => (
    <>
      <TextContainer>
        <StyledText size="h3">Your request has been submitted.</StyledText>
      </TextContainer>
      <StyledText>
        You will receive your estimate within 24 hours. If you do not receive an
        estimate, please <a href="mailto:colin@tinybird.ca">contact us</a>.
      </StyledText>
    </>
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
      </FormContainer>
    </Step3Container>
  );
};

export default Confirm;
