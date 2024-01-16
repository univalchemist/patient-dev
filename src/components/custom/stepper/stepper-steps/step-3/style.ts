import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { InstagramIcon, VerifiedIcon } from 'components/svg';
import { Button } from 'components/ui';

export const InstagramButton = styled(Button)<{ theme?: Theme }>`
  ${({ theme }) => `
    padding-left: 16px;
    padding-right: 16px;
    height: 38px;
    border-radius: 4px;

    ${theme.breakpoints.down('sm')} {
      margin-top: 10px;
    }
  `}
`;

export const FirstIcon = styled(VerifiedIcon)`
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;

export const SecondIcon = styled(InstagramIcon)`
  margin-right: 8px;
  width: 14px;
  height: 14px;
`;

export const InstagramContent = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding: 28px 29px 27px 18px;
    border: 1px solid #e4e7f3;
    border-radius: 8px;

    ${theme.breakpoints.down('sm')} {
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;

export const InstagramDescription = styled.div`
  margin-top: -8px;
  color: #6f6f6f;
  font-size: 14px;
  line-height: 1.6;
`;

export const InstagramGroupIconContent = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
    text-align: right;
    padding-top: 9px;

    svg {
      width: 166px;
    }

    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `}
`;

export const FullName = styled.div`
  color: #242424;
  font-weight: 600;
  font-size: 16px;
`;

export const InstagramUserName = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #6f6f6f;
`;
