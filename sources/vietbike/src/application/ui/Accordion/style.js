import styled, { css } from 'styled-components';

const styleLabel = typeStyle => {
	switch (typeStyle) {
		case 'third-level':
			return css`
				background: ${props => props.theme.colors.colorBlueDark};
				color: ${props => props.theme.colors.paleGrey};
				text-transform: capitalize;
				border-top: 1px solid ${props => props.theme.colors.colorChambray};
				border-left: 1px solid ${props => props.theme.colors.colorChambray};
				padding: 0 16px 0 32px;
			`;
		case 'first-level':
			return css`
				background: ${props => props.theme.colors.colorBlueOpaque};
				color: ${props => props.theme.colors.white};
				text-transform: uppercase;
				border-top: 1px solid ${props => props.theme.colors.colorBlueLight};
				border-left: 1px solid ${props => props.theme.colors.colorBlueLight};
				padding: 0 16px;
			`;
		case 'second-level':
			return css`
				background: ${props => props.theme.colors.colorChambray};
				color: ${props => props.theme.colors.colorHawkesBlue};
				text-transform: uppercase;
				border-top: 1px solid ${props => props.theme.colors.colorTransparent({r: 255, g: 255, b: 255, a: 0.2})};
				padding: 0 16px 0 24px;
			`;
		case 'ligth':
			return css`
				color: ${props => props.theme.colors.white};
				text-transform: uppercase;
				border-top: 1px solid ${props => props.theme.colors.colorBlueLight};
				padding: 16px 0;
			`;
		default:
			return css`
				background: ${props => props.theme.colors.colorChambray};
				color: ${props => props.theme.colors.white};
				text-transform: uppercase;
				border-top: 1px solid ${props => props.theme.colors.colorBlueLight};
				border-left: 1px solid ${props => props.theme.colors.colorBlueLight};
				padding: 0 8px;
			`;
	}
};

const AccordionWrapper = styled.div`

`;

const AccordionContent = styled.div`
	${props => props.typeStyle === 'accordion-grey' && css`
		&.ul-content {
			padding: 12px 0;
			background: ${props => props.theme.colors.colorTarawera};
			
			li {
				padding: 3px 8px;
				font-size: 0.9em;
				color: ${props => props.theme.colors.white};
				border: none;

				span {
					color: ${props => props.theme.colors.white};
				}
			}
		}
	`}
`;

const AccordionLabel = styled.label`
	cursor: pointer;
	font-weight: 500;
	font-size: .9em;
	height: 39px;
	&.children {
		font-size: 1.1em;
		color: ${props => props.theme.colors.paleGrey};
	}
	${props => styleLabel(props.typeStyle)}
`;

const AccordionWrapperIcon = styled.div`
	span {
		margin-right: 15px;
		color: ${props => props.theme.colors.iceBlue};
		font-size: .9em;
	}
	.img-rotate {
		transform: ${props => props.iconTransform};
	}
`;

export {
	AccordionWrapper,
	AccordionLabel,
	AccordionContent,
	AccordionWrapperIcon
}