import styled from 'styled-components';

const TagList = styled.ul`
	height: 330px;
	overflow-y: auto;
	overflow-x: hidden;
	border-top: 1px solid ${props => props.theme.colors.colorChambray};
	li {
		height: 44px;
		font-size:.9em;
		color:#fff;
		border-top: 1px solid ${props => props.theme.colors.colorChambray};
		line-height:30px;
		padding: 0 10px;
		cursor:pointer;
		position:relative;

		&.disable-click {
			pointer-events: none;
			opacity:1;
		}

		.icon {
			position:absolute;
			right:5px;
			top:6px;
		}

		span {
			color:#fff;
			opacity:0.6;
			display:block;
			line-height:0px;
		}
		&:first-of-type {
			border-top: none;
		}
	}
`;

const ErrorLayer = styled.div`
	display:block;
	background-color: ${props => props.theme.colors.persianRed};
	color: #fff;
	font-size:1.1em;
	position:absolute;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	z-index: 999;
	top: 45px;
	left: 0px;
	padding: 10px 30px 10px 10px;
	line-height: 15px;

	&:before {
		content:'';
		display:block;
		height: 45px;
		top:-45px;
		left: 0px;
    width: 100%;
    position: absolute;
		background-color: ${props => props.theme.colors.persianRed};
		opacity:0.3;
	}

	.icon {
		right: 0px;
    top: 3px;
	}
`;

const SuccessAddedLayer = styled.div`
	display: block;
	background-color: ${props => props.theme.colors.active};
	color: ${props => props.theme.colors.white};
	font-size: 1.1em;
	position: absolute;
	z-index: 999;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 10px 30px 10px 10px;
	line-height: 15px;
`;

export {
	TagList,
	ErrorLayer,
	SuccessAddedLayer
}