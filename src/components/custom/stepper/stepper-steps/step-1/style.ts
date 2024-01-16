import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const StepSpan = styled.div<{ theme?: Theme }>`
  color: #448cc9;
  text-align: right;
  font-size: 14px;
  margin-top: 8px;

  span {
    cursor: pointer;
    font-weight: 500;
  }
`;
