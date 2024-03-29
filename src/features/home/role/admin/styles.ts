import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const BenefitCardWrapper = styled.div<{
  theme?: Theme;
}>`
  ${({ theme }) => `
  width: 236px;
  min-height: 125px;

  @media screen and (max-width: 1560px) {
    width: 236px;
  }

  
  ${theme.breakpoints.down('xl')} {
    width: 236px;
  }
  ${theme.breakpoints.down('lg')} {
    width: 236px;
  }
    `}
`;
