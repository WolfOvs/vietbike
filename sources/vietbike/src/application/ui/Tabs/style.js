import styled from 'styled-components';

const Tab = styled.div`
	border-bottom: ${props => props.borderTab};
	padding: 14px 0;
	margin: 0 16px;
`;

const BtnTab = styled.button`
	cursor: pointer;
	opacity: ${props => props.active ? '1' : '.5'}
	font-size: 1em;
	font-weight: 500;
	color: #ffffff;
	text-transform: uppercase;
	background: transparent;
	border: none;
`

export {
	Tab,
	BtnTab
}