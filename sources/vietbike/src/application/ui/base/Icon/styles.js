import styled from 'styled-components';

const IconWrapper = styled.div`
  display: inline-block;
  text-align: center;
  position: relative;
  cursor: ${props => props.onClick ? 'pointer' : 'unset'};
  margin: ${props => props.margin};

  &.mr-20 {
    margin-right:20px;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
  }
`;

const getColorOnState = (props) => {
  switch(props.state) {
    case 'unavailable':
      return props.theme.colors.coolGrey;
    case 'marching':
      return props.theme.colors.active;
    case 'stationary':
			return props.theme.colors.strawberry;
		default:
			return '#FFFFFF';
  }
}

const DotState = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: ${props => getColorOnState(props)};
  border: 1px solid white;
`;

export {
  IconWrapper,
  DotState
}