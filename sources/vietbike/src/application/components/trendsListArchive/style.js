import styled from 'styled-components';

const WrapperList = styled.div`
	border-radius: 4px;
	border: solid 1px ${props => props.theme.colors.colorChambray};
	background-color:  ${props => props.theme.colors.colorTarawera};
`;

const Item = styled.div`
	border-bottom: solid 1px ${props => props.theme.colors.colorChambray};
	background-color:  ${props => props.theme.colors.colorTarawera};
	cursor: pointer;
	.title {
		width: 30%;
		padding: 16px 8px;
		border-right: solid 1px ${props => props.theme.colors.colorChambray};
		font-size: 1em;
		font-weight: 500;
		color: ${props => props.theme.colors.white};
	}
	.detail {
		padding: 16px 8px;
		flex-grow: 1;
		button {
			background: transparent;
			border: none;
			cursor: pointer;
		}
	}

	&:last-of-type {
		border-bottom: none;
	}
	
	&:hover {
		background: ${props => props.theme.colors.colorWedgewood};
	}
`;

export {
	WrapperList,
	Item
}