import styled, { css } from 'styled-components';

const PageWrapper = styled.div`
	flex-direction: column;   
	height: 100vh;
`;

const WrapperLayout = styled.section`
	position: relative;
	flex-grow: 1;
	overflow: hidden;
	background: ${props => props.theme.colors.darkBlueGrey};
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		flex-direction: column;
		overflow-y: ${props => props.isOpenMenu ? 'hidden' : 'auto'};
	}
`;

const WrapperSidebar = styled.div`
	position: relative;
	width: 100px;
	left: 0;
	background-color: ${props => props.theme.colors.colorBlueNavy};
	diplay: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 0px;

	${props => props.isInHome === true && css`
			position: relative;
			top: 0px;
	`};

	

	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		position: fixed;
		top: 56px;
		left: ${props => props.isOpen ? '0' : '-100%'};
		bottom: 0;
		right: 0;
		width: ${props => props.isOpen ? '100%' : '0'};
		height: 100%;
		background: ${props => props.theme.colors.shadow};
	}
`;

const LayerOpacity = styled.div`
	display:block;
	position:absolute;
	top: 40px;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${props => props.theme.colors.colorPrussianBlue};
	opacity: 0.9;
	z-index: 99999;
	~ .body-container {
		.select-ui {
			pointer-events: none;
		}
	}
`;

const WrapperCenter = styled.section`
	position: relative;
	flex-grow: 1;
	// background: linear-gradient(${props => props.theme.colors.colorBlueWale}, ${props => props.theme.colors.colorRegularBlue});
	background-image: linear-gradient(to bottom, ${props => props.theme.colors.colorBlueWale}, ${props => props.theme.colors.colorRegularBlue} 35%);
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		order: 1;
	}
`;

const WrapperNotification = styled.section`	
	margin-bottom: 80px;	
`;

export { PageWrapper, WrapperLayout, WrapperSidebar, LayerOpacity, WrapperCenter, WrapperNotification };