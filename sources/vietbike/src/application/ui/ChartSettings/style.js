import styled from 'styled-components';

const ChartSettingsContainer = styled.div`
	  padding: ${props => props.padding};
	  margin: 15px 0;
	color: ${props => props.theme.colors.white};
	border-top: 2px solid ${props => props.theme.colors.colorCeruleanBlue};
	border-bottom: 2px solid ${props => props.theme.colors.colorCeruleanBlue};
	.tooltip-chart-settings {
		display: none;
	}
	.zoom-filter-button {
		border-radius: 5px;
		margin-left: 0;
		font-size: 14px;

		&.active {
			background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
			
		}
	}
`;



const Label = styled.span`
	color: ${props => props.theme.colors.white};
	line-height:30px;
	font-size: 12px;
	font-weight: bold;
	font-family: 'Ubuntu';
}
`;

const CheckboxLabel = styled.span`
	color: ${props => props.theme.colors.white};
	line-height:30px;
	font-size: 14px;
	font-weight: bold;
	font-family: 'Ubuntu';
	display: flex;
	align-items: center;
	padding: 0 15px 0 10px;

	span {
		background-color: ${props => props.backgroundColor};
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin: 0 5px;
	}
}
`;

export {
	ChartSettingsContainer,
	Label,
	CheckboxLabel
}