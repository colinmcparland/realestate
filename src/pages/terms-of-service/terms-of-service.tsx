import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { cream } from "../../colors";
import Button from "../../common/button";
import GridContainer from "../../common/grid-container";
import StyledText from "../../common/styled-text";
import { bigPadding } from "../../css-constants";

const PageContainer = styled(GridContainer)`
  background-color: ${cream};
  ${bigPadding}
`;

const TermsOfService: FC = () => {
  const history = useHistory();

  return (
    <PageContainer alignContent="flex-start" rowGap="medium">
      <GridContainer rowGap="small">
        <StyledText size="h1">Terms of Service</StyledText>
        <StyledText>
          These Terms of Service govern your use of the website located at
          https://torontohomevalue.ca and any related services provided by
          Toronto Home Value.
        </StyledText>
        <StyledText>
          By accessing https://torontohomevalue.ca, you agree to abide by these
          Terms of Service and to comply with all applicable laws and
          regulations. If you do not agree with these Terms of Service, you are
          prohibited from using or accessing this website or using any other
          services provided by Toronto Home Value.
        </StyledText>
        <StyledText>
          We, Toronto Home Value, reserve the right to review and amend any of
          these Terms of Service at our sole discretion. Upon doing so, we will
          update this page. Any changes to these Terms of Service will take
          effect immediately from the date of publication.
        </StyledText>
        <StyledText>
          These Terms of Service were last updated on 1 March 2021.
        </StyledText>
        <StyledText size="h3">Limitations of Use</StyledText>
        <StyledText>
          By using this website, you warrant on behalf of yourself, your users,
          and other parties you represent that you will not:
        </StyledText>
        <StyledText>
          • modify, copy, prepare derivative works of, decompile, or reverse
          engineer any materials and software contained on this website;
        </StyledText>
        <StyledText>
          • remove any copyright or other proprietary notations from any
          materials and software on this website;
        </StyledText>
        <StyledText>
          • transfer the materials to another person or “mirror” the materials
          on any other server;
        </StyledText>
        <StyledText>
          • knowingly or negligently use this website or any of its associated
          services in a way that abuses or disrupts our networks or any other
          service Toronto Home Value provides;
        </StyledText>
        <StyledText>
          • use this website or its associated services to transmit or publish
          any harassing, indecent, obscene, fraudulent, or unlawful material;
        </StyledText>
        <StyledText>
          • use this website or its associated services in violation of any
          applicable laws or regulations;
        </StyledText>
        <StyledText>
          • use this website in conjunction with sending unauthorized
          advertising or spam;
        </StyledText>
        <StyledText>
          • harvest, collect, or gather user data without the user’s consent; or
        </StyledText>
        <StyledText>
          • use this website or its associated services in such a way that may
          infringe the privacy, intellectual property rights, or other rights of
          third parties.
        </StyledText>
        <StyledText size="h3">Intellectual Property</StyledText>
        <StyledText>
          The intellectual property in the materials contained in this website
          are owned by or licensed to Toronto Home Value and are protected by
          applicable copyright and trademark law. We grant our users permission
          to download one copy of the materials for personal, non-commercial
          transitory use.
        </StyledText>
        <StyledText>
          This constitutes the grant of a license, not a transfer of title. This
          license shall automatically terminate if you violate any of these
          restrictions or the Terms of Service, and may be terminated by Toronto
          Home Value at any time.
        </StyledText>
        <StyledText size="h3">Liability</StyledText>
        <StyledText>
          Our website and the materials on our website are provided on an
          &apos;as is&apos; basis. To the extent permitted by law, Toronto Home
          Value makes no warranties, expressed or implied, and hereby disclaims
          and negates all other warranties including, without limitation,
          implied warranties or conditions of merchantability, fitness for a
          particular purpose, or non-infringement of intellectual property, or
          other violation of rights.
        </StyledText>
        <StyledText>
          In no event shall Toronto Home Value or its suppliers be liable for
          any consequential loss suffered or incurred by you or any third party
          arising from the use or inability to use this website or the materials
          on this website, even if Toronto Home Value or an authorized
          representative has been notified, orally or in writing, of the
          possibility of such damage.
        </StyledText>
        <StyledText>
          In the context of this agreement, “consequential loss” includes any
          consequential loss, indirect loss, real or anticipated loss of profit,
          loss of benefit, loss of revenue, loss of business, loss of goodwill,
          loss of opportunity, loss of savings, loss of reputation, loss of use
          and/or loss or corruption of data, whether under statute, contract,
          equity, tort (including negligence), indemnity, or otherwise.
        </StyledText>
        <StyledText>
          Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or
          incidental damages, these limitations may not apply to you.
        </StyledText>
        <StyledText size="h3">Accuracy of Materials</StyledText>
        <StyledText>
          The materials appearing on our website are not comprehensive and are
          for general information purposes only. Toronto Home Value does not
          warrant or make any representations concerning the accuracy, likely
          results, or reliability of the use of the materials on this website,
          or otherwise relating to such materials or on any resources linked to
          this website.
        </StyledText>
        <StyledText size="h3">Links</StyledText>
        <StyledText>
          Toronto Home Value has not reviewed all of the sites linked to its
          website and is not responsible for the contents of any such linked
          site. The inclusion of any link does not imply endorsement, approval,
          or control by Toronto Home Value of the site. Use of any such linked
          site is at your own risk and we strongly advise you make your own
          investigations with respect to the suitability of those sites.
        </StyledText>
        <StyledText size="h3">Right to Terminate</StyledText>
        <StyledText>
          We may suspend or terminate your right to use our website and
          terminate these Terms of Service immediately upon written notice to
          you for any breach of these Terms of Service.
        </StyledText>
        <StyledText size="h3">Severance</StyledText>A
        <StyledText>
          ny term of these Terms of Service which is wholly or partially void or
          unenforceable is severed to the extent that it is void or
          unenforceable. The validity of the remainder of these Terms of Service
          is not affected.
        </StyledText>
        <StyledText size="h3">Governing Law</StyledText>
        <StyledText>
          These Terms of Service are governed by and construed in accordance
          with the laws of Canada. You irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </StyledText>
      </GridContainer>
      <Button justifySelf="flex-start" onClick={() => history.push("/")}>
        Back To Homepage
      </Button>
    </PageContainer>
  );
};

export default TermsOfService;
