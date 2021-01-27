import styled from 'styled-components';

const WrapperTablesChart = styled.div`
	flex-direction: row;
	flex-wrap: wrap;
	.masonry-with-columns {
		display: flex;
		flex-wrap: wrap;
		flex: 1 0 49%;
		&:nth-of-type(even) {
			padding-left: 8px;
		}	
		&:nth-of-type(odd) {
			padding-right: 8px;
		}	
		.item-masonry {
			margin: 0 8px 0 0;
			flex: 1 0 48%;
			&:nth-of-type(even) {
				margin: 0 0 0 8px;
			}	
		} 
	}
`;

export {
	WrapperTablesChart
}