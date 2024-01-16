import styled from '@emotion/styled';
import { Menu } from 'components/custom';

export const ActionsMenu = styled(Menu)<{
  position: { right: number; top: number };
}>`
  ${({ position }) => `
      position: fixed;
      z-index: 200;
      width: 120px;
      right: ${position?.right}px;
      top: ${position?.top}px;
      `}
`;

export const ISpan = styled.div`
  text-align: center;
  cursor: pointer;
`;
