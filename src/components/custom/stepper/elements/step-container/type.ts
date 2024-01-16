import type { StepperProps, Theme } from '@mui/material';

export interface StepContainerProps extends StepperProps {
  userStatus: number;
  onChangeStep: (index: number) => void;
}

export type TStepFinalProps = {
  theme?: Theme;
  status?: number;
};
