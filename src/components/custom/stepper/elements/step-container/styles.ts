import {
  StepConnector,
  Stepper,
  Theme,
  stepConnectorClasses,
} from '@mui/material';
import styled from '@emotion/styled';
import type { TStepFinalProps } from './type';

export const StepperContainer = styled(Stepper)`
  position: relative;
  z-index: 1;
  padding: 22px 0px;
  border-bottom: 1px solid #e2e8ec;
`;

export const StepperConnector = styled(StepConnector)<{ theme?: Theme }>`
  ${({ theme }) => `
  top: 9px;
  left: calc(-50% + 11px);
  right: calc(50% + 11px);

  .${stepConnectorClasses.alternativeLabel} {
    &.${stepConnectorClasses.active} {
      .${stepConnectorClasses.line} {
        background: ${theme.palette.primary.main};
      }
    }
  }

  .${stepConnectorClasses.line} {
    border: 3px solid ${theme.palette.common.stepper};
  }

  &.${stepConnectorClasses.completed} {
    .${stepConnectorClasses.line} {
      border-color: ${theme.palette.primary.main};
    }
  }

  &.${stepConnectorClasses.active} {
    .${stepConnectorClasses.line} {
      border-color: ${theme.palette.primary.main};
    }
  }
 `}
`;

export const StepFinal = styled.div<TStepFinalProps>`
  ${({ theme, status }) => `
    width: 24px;
    height: 24px;
    background: ${theme.palette.common.stepper};
    border-radius: 50px;
    padding: ${theme.spacing(0.8)};
    
    svg { 
      cursor: default;
      width: 100%;
      height: 100%;
      color: ${status && status > 4 ? '#448DC9' : 'white'} !important;
    }
  `}
`;
