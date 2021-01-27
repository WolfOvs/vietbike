import styled from 'styled-components';

const Item = styled.div`
	position: relative;
	padding-left: 13px;
	font-size: 1em;
	color: ${props => props.theme.colors.white};
	&:before {
		content: '';
		left: 0;
		top: 50%;
    transform: translateY(-50%);
		background-color: ${props => props.colorBullet};
		width: 8px;
		height: 8px;
		border-radius: 10px;
		position: absolute;
	}
`;

export {
	Item
}