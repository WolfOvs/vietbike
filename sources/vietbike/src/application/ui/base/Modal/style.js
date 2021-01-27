import styled from 'styled-components';
import { keyframes } from 'styled-components'

const FadeInOut = keyframes`
    0% {opacity:0;}
    8% {opacity:1;}
    92% {opacity:1;}
    100% {opacity:0;}
    `;

const ModalWindow = styled.div`
	position: fixed;
	display: block;
	background-color: rgba(0, 0, 0 ,0.4);
	backdrop-filter: blur(10px);
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: ${props => props.theme.zIndex.modal};
	visibility: hidden;
	opacity: 0;
	pointer-events: none;
	transition: all 0.3s;
	overflow-y: auto;
	&.show {
    visibility: visible;
    opacity: 1;
		pointer-events: auto;
	}
	.modal {
		max-width: ${props => props.maxWidth};
    	margin: 52px auto;
		border-radius: 10px;
	}
`;

const Title = styled.div`
  	font-size: 16px;
	color: ${props => props.theme.colors.white};
	text-transform: uppercase;
`;

const Header = styled.div`
	height: 60px;
	background: ${props => props.theme.colors.colorBlueNavy};
	padding: 0 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 500;
	border-radius: 10px 10px 0 0;

	.cancel {
		background-color:transparent;
   		border:none;
		cursor: pointer;
		position: relative;
		width: 14px;
		height: 14px;
		padding: 0;
		&:before, &:after {
			position: absolute;
			left: 7px;
			top: 0;
			content: ' ';
			height: 14px;
			width: 2px;
			background-color: ${props => props.theme.colors.white};;
		}
		&:before {
			transform: rotate(45deg);
		}
		&:after {
			transform: rotate(-45deg);
		}
	}
`;

const BodyModal = styled.div`
	background: ${props => props.theme.colors.colorCeruleanBlue};
	padding: 25px 40px;
	border-radius: 0 0 10px 10px;
`;

const SubtitleMap = styled.div`
	font-weight: bold;
	font-size: 22px;
	padding-bottom: 20px;
`;

const SubtitleNotification = styled.div`
	font-weight: bold;
	font-size: 22px;
	padding-bottom: 20px;
	padding-top: 20px;
	margin-top: 18px;
	border-top: dashed 1px ${props => props.theme.colors.colorBlueNavy};
`;

const ButtonWrapper = styled.div`
	cursor: pointer;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0px 10px 0px;
`;

const Cancel = styled.div`
	font-size:  14px;
	color: ${props => props.theme.colors.white};
	cursor: pointer;
	text-decoration: underline;
`;

const Confirm = styled.button`
	font-size:  14px;
	color: ${props => props.theme.colors.white};
	font-weight: bold;
	border: none;
	background-color: ${props => props.theme.colors.colorBlueNavy};
	padding: 15px 35px;
	border-radius: 10px;
	cursor: pointer;
	&:hover&:enabled {
		background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
	}
	&:disabled {
		background-color: grey;
		cursor: unset;
	}
`;

const Text = styled.div`
	font-size: 14px;
	margin-top: 10px;
`;

const OptionsWrapper = styled.div`
	border-top: dashed 1.5px ${props => props.theme.colors.colorBlueNavy};
	border-bottom: dashed 1.5px ${props => props.theme.colors.colorBlueNavy};
	padding: 24px 0;
	margin: 29px 0 9px 0;
`;

const RadioWrapper = styled.div`
	padding: 5px 0;
`;

const Label = styled.div`
	font-size: 14px;
`;

const ErrorText = styled.div`
	font-size: 14px;
	font-weight: bold;
	color: ${props => props.theme.colors.colorWarning};
	text-align: center;
	animation: ${FadeInOut} ease 5s;
`;

export {
	ModalWindow,
	Header,
	BodyModal,
	Title,
	ButtonWrapper,
	SubtitleMap,
	SubtitleNotification,
	Footer,
	Cancel,
	Confirm,
	Text,
	RadioWrapper,
	Label,
	OptionsWrapper,
	ErrorText
}