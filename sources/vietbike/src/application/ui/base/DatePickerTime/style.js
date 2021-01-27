import styled from 'styled-components';

const InputTime = styled.div`
margin: 0 10px 0 5px;
img {
	margin-left:5px;
}

.react-datepicker-popper {
	.react-datepicker {
		font-family: 'Ubuntu', sans-serif;
		border: none;
		.react-datepicker__triangle {
			display: none;
		}
	}
}

.react-datepicker__input-container {
	background-color: ${props => props.theme.colors.colorCeruleanBlue};
	border-radius: 4px;
	&:hover {
		background-image: linear-gradient(to right,#1295d4 0%,#11a0c4 20%,#0cce83 100%);
	}
}

.custom-input-datepicker {
	padding: 0 11px;
	position: relative;
	border-radius: 4px;
	border: none;
	background-color: transparent;
	height: 35px;
	line-height: 28px;
	color: ${props => props.theme.colors.white};
	font-size: 12px;
	max-width: 60px;
	background-image: url(${props => props.icon});
	background-repeat: no-repeat;
	background-position: center right 8px;
	background-size: 24px 24px;
	font-weight: bold;
	font-family: 'Ubuntu';
	cursor: pointer;
	&.react-datepicker-ignore-onclickoutside {
		border-color: ${props => props.theme.colors.white};
	}
}	

.custom-poppover-datepicker {
	z-index: ${props => props.theme.zIndex.modal};
	.react-datepicker__day-name, .react-datepicker__time-name {
		color:${props => props.theme.colors.colorPoloBlue};
		width: 1.8rem;
		height: 1.8rem;
		font-size: 1em;
		margin:.7rem .7rem 0rem .7rem;
		background-color: ${props => props.theme.colors.colorCeruleanBlue};
	}

	.react-datepicker__header--time {
		display: none;
	}
}


.custom-calendar-datepicker {
	background-color: ${props => props.theme.colors.colorCeruleanBlue};
	.react-datepicker__time-container{
		width: 210px;
		height: 150px;
		border: none;
		.react-datepicker__time {
			width: 100%;
			height: 99%;
			background-color:${props => props.theme.colors.colorCeruleanBlue};
			border-radius: 10px;
	
			.react-datepicker__time-box {
				border-radius: 0;
				margin: 1px;
				text-align: start;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		}
	}
	

	.react-datepicker__time-list-item {
		color:${props => props.theme.colors.white};
		font-size: 12px;
		padding: 0px 8px !important;
		line-height: 25px;
		border-radius: 8px;
		height: 24px !important;
		margin: 5px 10px 5px 4px;
		&:hover {
			background-image: linear-gradient(to right,#1295d4 0%,#11a0c4 20%,#0cce83 100%);
		}
		&.react-datepicker__time-list-item--selected {
			background-image: linear-gradient(to right,#1295d4 0%,#11a0c4 20%,#0cce83 100%);
		}
	}
	
	.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
		color:${props => props.theme.colors.colorCeruleanBlue};
		margin: 10px 0px;
		border-radius: 0;
		height: 88%;

		&::-webkit-scrollbar {
			width: 5px;

		}

		&::-webkit-scrollbar-thumb {
			background-color: ${props => props.theme.colors.colorBlueNavy};
		  }
	}
}
`;

export {
	InputTime
}