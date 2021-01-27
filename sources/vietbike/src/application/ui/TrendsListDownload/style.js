import styled from 'styled-components';

const Item = styled.div`
	border-bottom: 1px solid rgba(70, 92, 122, .5);
	color: white;
	font-size: 1em;
`;

const WrapperItem = styled.div`
	max-height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
`;

const WrapperInput = styled.div`
	border-top: 1px solid rgba(70, 92, 122, .5);
	border-bottom: 1px solid rgba(70, 92, 122, .5);
`;

export {
	Item,
	WrapperItem,
	WrapperInput
}