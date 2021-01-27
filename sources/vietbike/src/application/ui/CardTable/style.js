import styled from "styled-components";

const CardWrapper = styled.article`
	min-width: 150px;
	margin-bottom: 16px;

  & & {
		margin-bottom: 8px;
  }

  @keyframes changeBorder {
    from {
			box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.8);
		}
    to {
			box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.8);
		}
	}
	@keyframes changeB {
    from {
			background-color: ${props => props.theme.colors.colorTransparent({ r: 62, g: 183, b: 234, a: 0.1 })};
		}
    to {
			background-color: ${props => props.theme.colors.colorTransparent({ r: 62, g: 183, b: 234, a: 0.3 })};
		}
  }
  &.highlight {
    animation-name: changeBorder;
		animation-duration: 4s;
		.highlight {
			animation-name: changeB;
			animation-duration: 4s;
		}
	}
`;

const Header = styled.header`
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.colorChambray};
  padding: 4px;
  font-size: .9em;
	font-weight: 500;
	letter-spacing: .5px;
`;

const CardContent = styled.div`
  border-radius: 0 0 4px 4px;
	background-color: ${props => props.theme.colors.colorTarawera};
	&.container-article {
		border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
		border-left: 1px solid ${props => props.theme.colors.colorChambray};
		border-right: 1px solid ${props => props.theme.colors.colorChambray};
		border-top: 1px solid ${props => props.theme.colors.colorChambray};
		border-radius: 0px 0px 4px 4px;
		padding: 8px;
	}
	article:last-of-type{
		margin-bottom: 0;
	}
`;

export { CardWrapper, Header, CardContent };
