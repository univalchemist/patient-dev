import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme } from '@mui/material';

const sizes = {
  small: 1,
  medium: 2,
  large: 3,
};

export const StyledLoadingButton = styled(LoadingButton)<{ theme?: Theme }>`
  ${({ theme, size, color }) => `
    border-radius: 6px;
    font-weight: 400;
    text-transform: none;
    font-size: 14px;
    box-shadow: none;
    padding: ${theme.spacing(
      sizes[size as keyof typeof sizes] * 1
    )} ${theme.spacing(sizes[size as keyof typeof sizes] * 2)};
    &:hover {
      box-shadow: none;
    }
    &:disabled {
      background-color: ${
        (theme.palette[color as keyof typeof theme.palette] as any).main
      };
      opacity: 0.5;
    }
  `}
`;
