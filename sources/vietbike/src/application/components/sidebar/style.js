import styled from 'styled-components';

const WrapperAside = styled.aside`
	position: relative;
	display: flex;
	width:100%;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	height: 100%;
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		order: 2;
		overflow-y: unset;
		height: auto;
		width: 100%;
		max-width: 100%;
	}
	button {
		position: absolute;
		display: block;
		bottom: 18px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const UserName = styled.div`
	display: block;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const Text = styled.div`
	font-size: 12px;
	font-weight: bold;
	padding: 1px 0;
`;

const Options = styled.div`
	display: block;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width:100%;

	&::before {
		display: block;
		content: '';
		height: 85px;
		width: 5px;
		background-image: linear-gradient(to bottom, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
		position: absolute;
		left: 0;
	}
`;

export {
  WrapperAside, 
  UserName,
  Text,
  Options
}