import styled from '@emotion/styled';
import { Alert, Theme } from '@mui/material';
import { Card } from 'components/ui';

export const StepperMain = styled(Card)`
  min-height: 80vh;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SubmitButtonsMain = styled.div<{ theme?: Theme }>`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 24px;

  button {
    width: 183px;
  }

  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      button {
        width: 100px;
      }
    }
  `}
`;
export const StepContent = styled.div`
  padding: 24px;
`;

export const StepContentLabel = styled.div`
  color: #2d3779;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 24px;
`;

export const FormGroup = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 8px;
    row-gap: 20px;

    ${theme.breakpoints.down('sm')} {
      grid-template-columns: 1fr;
    }
  `}
`;

export const StepContainer = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 33px;

    ${theme.breakpoints.down('md')} {
      grid-template-columns: repeat(1, 1fr);
    }
  `}
`;

export const StepAlert = styled(Alert)`
  padding: 11px 23px 11px 10px;

  .MuiAlert-icon {
    margin-right: 9px;
    padding: 0;

    svg {
      width: 20px;
      height: 20px;
      color: #448cc9;
    }
  }

  .MuiAlert-message {
    padding: 0;
    color: #6f6f6f;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;
  }
`;
