import React from 'react';
import { StyledLoadingButton } from './styles';
import { TLoadingButtonProps } from './types';

const LoadingButton = ({
  size = 'medium',
  color = 'primary',
  loading,
  ...props
}: TLoadingButtonProps) => (
  <StyledLoadingButton color={color} size={size} {...props} loading={loading} />
);

export default LoadingButton;
