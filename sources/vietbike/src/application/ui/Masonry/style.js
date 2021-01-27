import styled from 'styled-components';

const MasonryWrapper = styled.div`
	padding: 32px 16px;
	.columns-container {
		display: flex;
		margin-right: -8px;
		margin-left: -8px;
	}

	.masonry-card {
		width: 100%;
		border-radius: 5px;
	}
`;

const Column = styled.div`
	flex: 1 1 488px;
	padding: 0 8px;
`;


export {
	MasonryWrapper,
	Column
}