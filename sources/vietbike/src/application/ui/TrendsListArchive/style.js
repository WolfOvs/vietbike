import styled from 'styled-components';

const WrapperList = styled.div`
	heigth: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	border-radius: 4px;
	border: solid 1px ${props => props.theme.colors.colorChambray};
	background-color:  ${props => props.theme.colors.colorTarawera};
`;

const Item = styled.div`
	border-bottom: solid 1px ${props => props.theme.colors.colorChambray};
	background-color:  ${props => props.theme.colors.colorTarawera};
	.title {
		width: 30%;
		padding: 16px 8px;
		border-right: solid 1px ${props => props.theme.colors.colorChambray};
	}
	.detail {
		
	}
`;

export {
	WrapperList,
	Item
}