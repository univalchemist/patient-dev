import styled from '@emotion/styled';
import { StepLabel, Theme } from '@mui/material';

export const StepLabelMain = styled(StepLabel)<{ theme?: Theme }>`
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      .MuiStepLabel-labelContainer {
        display: none;
      }
    }

    .MuiStepLabel-label {
      font-family: 'Inter', sans-serif;
      color: #769cba;

      &.Mui-active {
        font-weight: 700;
        color: #448cc9;
      }

      &.Mui-completed {
        color: #2d3779;
      }
    }
  `}
`;
