/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
import React from 'react';
import { VerifiedIcon } from 'components/svg';
import { StepIcon } from '@mui/material';
import { steps } from './utils';
import Step from '../step';
import StepLabel from '../step-label';
import { StepFinal, StepperConnector, StepperContainer } from './styles';
import { StepContainerProps } from './type';

const StepIconComponent = (userStatus: number) => (
  <StepFinal status={userStatus}>
    <VerifiedIcon />
  </StepFinal>
);

const StepContainer = ({
  userStatus,
  onChangeStep,
  ...props
}: StepContainerProps) => (
  <StepperContainer
    {...props}
    alternativeLabel
    connector={<StepperConnector />}
  >
    {steps.map((stepLabel: string, index: number) =>
      index !== 4 ? (
        <Step key={stepLabel} onClick={() => onChangeStep(index)}>
          <StepLabel
            StepIconComponent={(props: any) => (
              <StepIcon
                {...props}
                icon={props.icon}
                active={props.active || props.completed}
                completed={false}
              />
            )}
          >
            {stepLabel}
          </StepLabel>
        </Step>
      ) : (
        <Step key={stepLabel}>
          <StepLabel StepIconComponent={() => StepIconComponent(userStatus)}>
            {stepLabel}
          </StepLabel>
        </Step>
      )
    )}
  </StepperContainer>
);

export default StepContainer;
