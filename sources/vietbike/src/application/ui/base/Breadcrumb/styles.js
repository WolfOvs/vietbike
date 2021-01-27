import styled from 'styled-components';

const WrapperBreadcrumb = styled.ul`
	li {
		font-size: 34px;
		color: ${props => props.theme.colors.white};
		font-weight: 200;
		padding-right: 10px;
		opacity: 1;
		a {
			position: relative;
			color: ${props => props.theme.colors.white};
			text-decoration: none;
			padding-right: 10px;
		}
		img {
			transform: rotate(-90deg);
		}
		span {
			font-size: 30px;
			font-weight: 600;
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			background-image: linear-gradient(279deg, #00d082, #009bd3);
		}
	}
`;

const DateUpdate = styled.div`
	
`;

const WrapperDetails = styled.div`
	display: flex;
	text-transform: uppercase;
	font-size: 14px;
	padding-top: 17px;
`;

const StateDetail = styled.div`
	display: flex;
	border-left: solid 2px ${props => props.theme.colors.colorCeruleanBlue};
	margin-left: 10px;
	padding-left: 10px;
	
	span {
		display: flex;
		align-items: center;
		&::before {
			content: '';
			width: 10px;
			height: 10px;
			border-radius: 50%;
			border: solid 2px ${props => props.theme.colors.white};
			margin: 0 4px 0 9px;
		}
	}

	${props => props.stateColor == 0 &&`
				span::before{
					background-color: ${props.theme.colors.colorSuccess};
				}
			`}
			${props => props.stateColor == 1 &&`
				span::before{
					background-color: ${props.theme.colors.colorError};
				}
			`}
			${props => props.stateColor == 2 &&`
				span::before{
					background-color: ${props.theme.colors.colorGreyLight};
				}
			`}
`;


export {
	WrapperBreadcrumb,
	DateUpdate,
	WrapperDetails,
	StateDetail
}