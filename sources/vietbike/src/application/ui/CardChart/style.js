import styled from "styled-components";

const CardWrapper = styled.article`
	margin-bottom: 16px;
	position: relative;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	font-size: 1em;
	color: ${props => props.theme.colors.white};
	height: 40px;
	background-color: ${props => props.theme.colors.colorChambray};
	border-radius: 4px 4px 0 0;
	.tooltip {
    top: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
  }
`;

const CardContent = styled.div`
	background: linear-gradient(${props => props.theme.colors.colorBlueWhale}, ${props => props.theme.colors.colorTarawera});
	padding: 16px;
`;

const DotMenu = styled.button`
	cursor: pointer;
	border: none;
	background: transparent;
	position: relative;
	padding: 0;
	margin-left: 16px;
`;

export { CardWrapper, Header, CardContent, DotMenu };
