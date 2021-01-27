import styled from 'styled-components';

const HeaderWrapper = styled.header`
  height: ${props => props.theme.constants.HEADER_HEIGHT}px;
  background: ${props => props.theme.colors.colorPrussianBlue};
  padding: 0 24px;
  flex-shrink: 0;
`;

const WrapperBreadcrumb = styled.div`
  padding-left: 20px;
`;


export {
  HeaderWrapper
};

export {
  WrapperBreadcrumb
};


