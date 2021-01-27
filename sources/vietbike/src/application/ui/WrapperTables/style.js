import styled from 'styled-components';

const WrapperTablesChart = styled.div`
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		flex-flow: wrap;
		padding: ${props => props.padding ? props.padding : '16px 8px'};
		.column-tables {
			&:last-child {
				padding-bottom: 0;
			}
		}
	}
`;

const ColumnTables = styled.div`
	flex: 1;
	padding: 0 8px;
	flex-basis: ${props => props.flaxBasis};
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		flex-basis: 100%;
	}
`;

const CardChart = styled.div`
	padding: 8px;
	border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
	border-left: 1px solid ${props => props.theme.colors.colorChambray};
	border-right: 1px solid ${props => props.theme.colors.colorChambray};
`;

export {
	WrapperTablesChart,
	ColumnTables,
	CardChart
}