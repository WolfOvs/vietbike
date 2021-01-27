import styled from 'styled-components';

const InputDate = styled.div`
	margin: 0 5px 0 10px;
	img {
		margin-left:5px;
	}

	.react-datepicker-popper {
		.react-datepicker {
			font-family: 'Ubuntu', sans-serif;
			font-size: 12px;
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
		max-width: 100px;
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
		
		.react-datepicker__day-names{
			.react-datepicker__day-name, .react-datepicker__time-name {
				color:${props => props.theme.colors.white};
				height: 1.8rem;
				font-size: 12px;
				margin:.7rem .7rem 0rem .7rem;
			}
		}

    .react-datepicker__header {
      width:270px;
      background-color: ${props => props.theme.colors.colorCeruleanBlue};
      border-bottom:none;
	  font-size: 12px;
	  margin-left: 4px;
      .react-datepicker__current-month {
        color:${props => props.theme.colors.white}; 
        height: 30px;
        line-height: 35px;
        text-align: start;
		margin-left: 14px;
		text-transform: capitalize;
		font-size: 12px;
	  }
    }
	}

	.custom-day-datepicker {
		color: ${props => props.theme.colors.white};
		width: 1.8rem;
		height: 1.8rem;
		font-size: 12px;
		margin: 3px;
		padding: 5px;
		border-radius: 5px;
		background-color: ${props => props.theme.colors.colorBlueNavy};

		&:hover {
			background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
		}

		&.selected {
			background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
		}

		&.disabled, &.react-datepicker__day--disabled {
			opacity: 0.3;
		}

		&.react-datepicker__day--outside-month {
			background-color: ${props => props.theme.colors.colorGreyBlue};
		}

		&.react-datepicker__day--in-range {
			background-color: unset;
			position: relative;
			&:before {
				content: '';
				position: absolute;
				height: 100%;
				width: calc(100% + 1.4rem);
				top: 50%;
				left: -.7rem;
				background-color: ${props => props.theme.colors.colorSummerSky};
				opacity: .4;
				transform: translateY(-50%);
			}
		}
		&.react-datepicker__day--range-start {
			background-color: ${props => props.theme.colors.colorSummerSky};
			&:before {
				content: '';
				position: absolute;
				height: 100%;
				width: 90%;
				top: 50%;
				left: 50%;
				background-color: ${props => props.theme.colors.colorSummerSky};
				opacity: .4;
				transform: translateY(-50%);
			}
		}
		&.react-datepicker__day--range-end {
			background-color: ${props => props.theme.colors.colorSummerSky};
			&:before {
				content: '';
				position: absolute;
				height: 100%;
				width: 90%;
				top: 50%;
				right: 50%;
				left: unset;
				background-color: ${props => props.theme.colors.colorSummerSky};
				opacity: .4;
				transform: translateY(-50%);
			}
		}
	}

	.custom-calendar-datepicker {
		background-color: ${props => props.theme.colors.colorCeruleanBlue};
		border: none;

		.react-datepicker__month {
			margin: 2px 10px 10px 10px;
		}
		
		.react-datepicker__navigation {
			width: 7px;
			height: 7px;			
		}
		.react-datepicker__navigation--previous {
			top: 15px;
			left: unset;
			right: 46px;
			border: none;
			background-color: ${props => props.theme.colors.colorBlueNavy};
			border-radius: 50%;
			width: 21px;
			height: 21px;

			&::before {
				content: "";
				width: 5px;
    			height: 5px;
				display: block;
				border: 1px solid white;
				border-width: 0 1px 1px 0;
				margin: 7px 0 0 9px;
				transform: rotate(135deg);
				-webkit-transform: rotate(135deg);
			}
		}
		.react-datepicker__navigation--next {
			top: 15px;
			right: 15px;
			border: none;
			background-color: ${props => props.theme.colors.colorBlueNavy};
			border-radius: 50%;
			width: 21px;
			height: 21px;

			&::before {
				content: "";
				width: 5px;
    			height: 5px;
				display: block;
				border: 1px solid white;
				border-width: 1px 0 0 1px;
				margin: 7px 0 0 6px;
				transform: rotate(135deg);
				-webkit-transform: rotate(135deg);
			}
		}
	}
`;

export {
	InputDate
}