import styled from 'styled-components';

const ContainerFilters = styled.div`
	position: absolute;
	width: 100%;
	top: 37px;
	left: 0;
	z-index: ${props => props.theme.zIndex.xl};
	justify-content: flex-end;
	background: ${props => props.theme.colors.white};
	box-shadow: 0 0 5px 0 ${props => props.theme.colors.shadow};
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}) {
		justify-content: flex-start;
	}
`;

const WrapperBtn = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 25px;
`;

const NotificationCount = styled.div`
	width:18px;
	height:18px;
	background-color: red;
	display:block;
	position:absolute;
	border-radius:100%;
	text-align:center;
	right:30px;
	font-size: 11px;
	font-weight: bold;

	span {
		padding-top: 2px;
		padding-right: 1px;
		display: block;
	}
`;

export {
	ContainerFilters,
	WrapperBtn,
	NotificationCount
}