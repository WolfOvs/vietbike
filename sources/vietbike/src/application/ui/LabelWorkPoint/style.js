import styled from 'styled-components';

const WrapperLabel = styled.div`
	padding: ${props => props.padding};
`;

const Pointer = styled.div`
	flex-grow: 1;
	flex-basis: 50%;
	padding: 5px;
	border-top: 1px solid ${props => props.theme.colors.colorChambray};
	border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
	&:first-of-type {
		margin-right: 16px;
	}
`

const Label = styled.span`
	color: ${props => props.theme.colors.colorPoloBlue};
	font-size: .9em;
`;

const Value = styled.span`
	color: ${props => props.theme.colors.colorTransparent({ a: 0.9 })};
	font-size: .9em;
	margin-left: 5px;
`;

const Tag = styled.div`
	color: ${props => props.theme.colors.colorTransparent({ a: 0.6 })};
	font-size: .9em;
	margin-top: 3px;	
	text-transform: uppercase;
`;

export {
	WrapperLabel,
	Pointer,
	Label,
	Value,
	Tag
}