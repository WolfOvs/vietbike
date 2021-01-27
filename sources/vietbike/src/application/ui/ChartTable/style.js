import styled from "styled-components";

const List = styled.ul`
	color: ${props => props.theme.colors.white};
		.li-sliders {
			height: 28px;
			align-items: center;
			align-content: center;
			justify-items: center;
			display: flex;
			text-align: left;
			font-weight: 500;
			padding: 0 5px;
			min-width: 100px;
			border-bottom: 1px solid ${props => props.theme.colors.colorBlumine};
			border-right: 1px solid ${props => props.theme.colors.colorBlumine};
			border-left: 1px solid ${props => props.theme.colors.colorBlumine};
			&.param {
				cursor: pointer;
				&:nth-child(1) {
					border:none;
					border-right: 1px solid ${props => props.theme.colors.colorBlumine};
					span {
						display:none;
					}
				}
				.tooltip-slider-table {
					display: none;
					position: fixed;
					margin-top: -20px;
				}
				&:hover {
					.tooltip-slider-table {
						display: block;
					}
				}
			}
			&:nth-child(1) {
				border:none;
				background-color: ${props => props.theme.colors.colorChambray};
				span {
					display:none;
				}
			}
		}
`;
export {
	List
}