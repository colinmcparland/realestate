import React, { FC } from "react";
import styled from "styled-components";
import { darkOrange } from "../colors";
import { bigPadding, mediumPadding, topMargin } from "../css-constants";
import skyline from "../images/skyline.png";
import { mobile, desktop } from "../util/responsive";
import GridContainer from "./grid-container";
import StyledText from "./styled-text";

const SidebarContainer = styled(GridContainer)`
  background-color: ${darkOrange};
`;

const SkylineImage = styled.img`
  max-width: 100%;
  align-self: flex-end;
`;

const TextContainer = styled(GridContainer)`
  ${mobile`
    ${mediumPadding}
  `}

  ${desktop`
    ${bigPadding}
  `}
`;

const AddressContainer = styled(StyledText)`
  ${topMargin}
`;

interface SidebarProps {
  address: string | null;
  unit: string | null;
}
const Sidebar: FC<SidebarProps> = ({ address, unit }) => (
  <SidebarContainer>
    <TextContainer alignContent="flex-start" rowGap="big">
      <StyledText bold opaque>
        Toronto Home Value
      </StyledText>
      <GridContainer rowGap="medium">
        <StyledText bold size="h2" color="white">
          Success!
        </StyledText>
        <StyledText bold size="h2" color="white">
          We found your address.
        </StyledText>
        {address && (
          <AddressContainer bold color="whiteTransparent" size="h3">
            {`${unit && `#${unit} - `}${address}`}
          </AddressContainer>
        )}
      </GridContainer>
    </TextContainer>
    <SkylineImage src={skyline} />
  </SidebarContainer>
);

export default Sidebar;
