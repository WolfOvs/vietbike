import styled from 'styled-components';

const ContainerCards = styled.div`
	display:flex;

	@media(max-width: 768px) {
		display:block;
	}
`;

const Circle = styled.div`
	width:150px;
	height:150px;
	border-radius:100%;
	text-align:center;
	background-color:#fff;
	line-height: 150px;
	font-family: 'Nunito', sans-serif;
	font-weight:700;
	position: absolute;
    bottom: 40px;
	right: 40px;
	
	animation: pulse 1s infinite;

	@media(max-width: 768px) {
		display:block;
	}
`;

const BoxRedirect = styled.div`
	color: ${props => props.theme.colors.vietRed};
	font-size:50px;
	text-align:center;
	background-color: #fff;
	width:50%;
	background: ${props => `url(${props.img}) no-repeat top center`};
	background-size:cover;
	height: calc(100vh - 200px);
	position:relative;

	@media(max-width: 768px) {
		width:100%;
		height: calc(50vh - 51px);
	}
`;

const HomeContainer = styled.div`
	background-color: ${props => props.theme.colors.vietGreen};
	font-size:16px;
	height:100vh;
`;

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
	HomeContainer,
	Circle,
	BoxRedirect,
	ContainerCards,
	ContainerFilters,
	WrapperBtn,
	NotificationCount
}