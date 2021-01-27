import styled, { css } from "styled-components";

const WrapperTab = styled.div`
	// padding: 32px 16px;
	// overflow-y: auto;
	// overflow-x: hidden;
`

const TabsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 32px 16px 0 16px;
`;

const TabsList = styled.ul`
  display: flex;
  flex-direction: row;
	flex-wrap: nowrap;
	position: relative;
`;

const TabsListItem = styled.li`
	display: flex;
	align-items: center;
	cursor: pointer;
  text-transform: uppercase;
  color: ${props => props.theme.colors.white};
  ${props => props.active &&
    css`
			background-color: ${props => props.theme.colors.colorSummerSky};
		`};
	border-radius: 4px;
	border: solid 1px ${props => props.theme.colors.colorBlumine};
	font-size: 0.9em;
	letter-spacing:0.5px;
	padding: 8px 16px;
	font-weight: 500;
	margin-right: 16px;
	&:last-of-type {
		margin-right: 0;
	}
	&:hover {
    background-color: ${props => props.theme.colors.colorSummerSky};
  }
`;

const ContainerButtons = styled.div`
	button	{
		margin-right: 16px;
		&:last-of-type {
			margin-right: 0;
		}
	}
`;

const TabContainer = styled.div`
	position: relative;
	padding: 32px 0 0 0;
`;

export { 
	TabsList, 
	TabsListItem, 
	TabsHeader, 
	TabContainer, 
	ContainerButtons, 
	WrapperTab 
};
