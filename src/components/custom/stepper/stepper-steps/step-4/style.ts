import styled from '@emotion/styled';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TooltipDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #6f6f6f;
  font-size: 11px;
  line-height: 1.6;
  font-weight: normal;

  .title {
    color: #2d3779;
    font-size: 14px;
    font-weight: 500;
  }

  .example {
    color: #242424;
    font-weight: 600;
  }
`;

export const BlockLabel = styled.div`
  color: #242424;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
`;

export const InputLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6f6f6f;
  font-weight: 500;

  svg {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    color: white;
  }
`;

export const Hint = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #6f6f6f;
  margin-top: 6px;

  svg {
    margin-right: 4px;
    width: 14px;
    height: 14px;
    color: white;
  }

  strong {
    color: #448cc9;
  }
`;
