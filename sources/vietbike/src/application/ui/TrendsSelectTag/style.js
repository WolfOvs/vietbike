import styled from 'styled-components';

const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: 0 5px;
	border-right: 1px solid ${props => props.theme.colors.colorChambray};
	border-left: 1px solid ${props => props.theme.colors.colorChambray};
	border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
	border-radius: 0 0 5px 5px;
`;

const Body = styled.div`
	position: relative;
	flex-grow: 1;
`;

const Header = styled.div`
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	text-transform: uppercase;
	color: ${props => props.theme.colors.white};
	background-color: ${props => props.theme.colors.colorChambray};
	padding: 4px;
	font-size: .9em;
	font-weight: 500;
	letter-spacing: .5px;
`;

export {
	Column,
	Header,
	Body
}