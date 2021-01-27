import styled, { css } from 'styled-components';

const ListUL = styled.ul`
	li {
		border-top: 1px solid ${props => props.theme.colors.lightSkyBlue};
		padding: 0 5px;
		height: auto;
		&:first-of-type {
			border-top: none;
		}
		&.style-grey {
			background-color: ${props => props.theme.colors.pattensBlue};
		}
		&.click-threshold {
			cursor: pointer;
		}
	}
`;

const Value = styled.span`
	position: relative;
	color: ${props => props.theme.colors.blueWhale};
	font-weight: 500;
	text-align: right;

	&.not-trusted {
		color:#fff !important;
	}

	&.block {
		color: #ff7a76 !important;
	}

	&.alarm {
		color: #ff8d00 !important;
	}

	&.pre-alarm {
		color: #ffe16c !important;
	}

	${props => props.link && css`
		text-decoration: underline;
		cursor: pointer;
		&:hover {
			color: ${props => props.theme.colors.active};
		}
	`}
	.tooltip {
		position: absolute;
		display: none;
		width: 130px;
		top: -10px;
		left: 30%;
		transform: translate(-50%, -100%);
		z-index: ${props => props.theme.zIndex.tooltip};
	}
	&:hover {
		.tooltip {
			display: block;
		}
	}
	span {
		margin-left: 5px;

		&.not-trusted {
			color:#fff !important;
		}
	
		&.block {
			color: #ff7a76 !important;
		}
	
		&.alarm {
			color: #ff8d00 !important;
		}
	
		&.pre-alarm {
			color: #ffe16c !important;
		}
	}
`;

const SubListUL = styled.ul`
	li {
		min-height: 20px;
		padding: 0 5px 0 20px;
		border: none;
		position: relative;
		&:before {
			content: ''; 
			position: absolute;
			left: 12px;
			top: 50%;
			transform: translate(-50%,-50%);
			height: 4px;
			4px: ;
			width: 4px;
			border-radius: 50%;
			background: ${props => props.theme.colors.battleshipBrey};
		}
		&.style-grey {
			background-color: ${props => props.theme.colors.pattensBlue};
		}
	}
`;

export {
	ListUL,
	SubListUL,
	Value
}