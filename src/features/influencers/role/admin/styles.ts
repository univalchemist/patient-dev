import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const TableTooltip = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
        background: ${theme.palette.common.white};
        color: #4f4f4f;
        padding: ${theme.spacing(4)} ${theme.spacing(4)};
        font-size: 16px;
        margin: -10px;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.45);
        border-radius: 8px;
        letter-spacing: 1px;
        white-space: normal; /* Allow wrapping */
        max-width: 500px;

        span {
          text-decoration: underline;
          color: #4f4f4f;
        }
    `}
`;

export const ButtonGroupContainer = styled.div`
  ${({ theme }) => `
        position: relative;
    `}
`;

export const AmbassadorAction = styled.div`
  cursor: pointer;
`;

export const ISpan = styled.div`
  cursor: pointer;
`;
