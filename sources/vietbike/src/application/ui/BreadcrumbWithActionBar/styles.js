import styled from 'styled-components';

const WrapperBreadcrumb = styled.div`
	position: absolute;
    display: flex;
	padding: 0 40px;
	box-sizing: border-box;
    height: 149px;
    z-index: 9999;
    width: 100%;
    background-image: linear-gradient(to bottom, #01080c, rgba(1, 8, 12, 0) 98%);
`;

const TresholdLayer = styled.div`
	display: block;
	width: 100%;
	background: ${props => {
		switch(props.type) {
			case 'ok':
				return props.theme.colors.active;
			case 'ko':
				return props.theme.colors.persianRed;
			default: return props.theme.colors.colorSummerSky;
		}
	}};
	color: ${props => props.theme.colors.white};
	text-align: center;
	line-height: 23px;
	text-transform: uppercase;
	position: fixed;
	z-index: ${props => props.theme.zIndex.xs};
	top: 96px;
`;



export {
		WrapperBreadcrumb,
		TresholdLayer
}