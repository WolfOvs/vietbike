import styled from 'styled-components';

const ListUL = styled.ul`
	li {
		border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
		border-left: 1px solid ${props => props.theme.colors.colorChambray};
		border-right: 1px solid ${props => props.theme.colors.colorChambray};
		padding: 0 5px;
		height: 22px;
		font-size: .9em;
		color: ${props => props.theme.colors.colorTransparent({a: 0.6})};
		&:last-child {
			border-radius: 0 0 4px 4px;
		}
		background-color: ${props => props.theme.colors.colorTarawera};
	}
	& ul:last-child {
		border-radius: 0 0 4px 4px;
	}
`;

const Value = styled.span`
	position: relative;
	color: ${props => props.theme.colors.white};
	font-weight: 500;
	text-align: right;
	margin-right: 5px;
	span {
		margin-left: 5px;
	}
`;

const SubListUL = styled.ul`
	border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
	border-left: 1px solid ${props => props.theme.colors.colorChambray};
	border-right: 1px solid ${props => props.theme.colors.colorChambray};	
	li {
		min-height: 22px;
		padding: 0 5px 0 20px;
		border: none;
		position: relative;
		.sublist {
			position: relative;
			&:before {
				content: ''; 
				position: absolute;
				left: -10px;
				top: 50%;
				transform: translate(-50%,-50%);
				height: 3px;
				width: 3px;
				border-radius: 50%;
				background: ${props => props.theme.colors.battleshipBrey};
			}
		}
	}
`;

export {
	ListUL,
	SubListUL,
	Value
}