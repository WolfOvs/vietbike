import styled from 'styled-components';

const WrapperLabel = styled.div`
	width: 100%;
	cursor: pointer;
	a {
		width: 100%;
	}
`;

const Station = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 15px;
`;

const Title = styled.p`
  font-size: 1em;
  color: ${props => props.theme.colors.paleGrey};
  margin: 3px 0 0 0;
  text-transform: uppercase;
`;

const WrapperTCState = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export {
	WrapperLabel,
	Station,
	WrapperTCState,
	Title,
}
