import styled, { css } from "styled-components";

const WrapperProgressBar = styled.div`
  padding: ${props => props.noPadding ? `4px 0`  : `4px 12px`};
`;

const Label = styled.label`
  font-size: 0.8em;
  font-weight: 500;
  color: ${props => props.theme.colors.blueWhale};
`;

const ProgressBarUI = styled.div`
	overflow: hidden;
  position: relative;
  height: 16px;
  border: solid 1px ${props => props.theme.colors.colorChambray};
  background-color: ${props => props.theme.colors.colorTransparent({a: 0.1})};
	border-radius: 4px 4px 0 0;
	${props => props.withAxis && css`
		&:after {
			position: absolute;
			content: ' ';
			background-color: ${props => props.theme.colors.colorChambray};
			top: 0;
			left: 50%;
			height: 16px;
			width: 1px;
			transform: translateX(-100%);
		}
	`}
`;

const Progress = styled.div`
	border-radius: ${props => props.width > 0 ? '0 4px 4px 0' : '4px 0 0 4px;'};
  height: 100%;
  background-color: ${props => props.theme.colors.colorSummerSky};
  transition: width 400ms ease-in-out;
  width: ${props => `${ Math.abs(props.width) || 0 }%`};
  position: absolute;
  top: 0;
  left: 0;
  ${props => props.withAxis && css`
    right: ${props.width >= 0 ? 0 : '50%'};
		left: ${props.width >= 0 ? '50%' : 'auto'};
  `}
`;

const ContainerSteps = styled.div`
	position: relative;
	height: 13px;
`;

const StepItem = styled.div`
  position: absolute;
  height: 10px;
  font-weight: bold;
	font-size: .8em;
	color: ${props => props.theme.colors.white};
	left: ${props => props.left}%;
	top: 8px;
	transform: translate(-50%, -50%);
	&:last-of-type {
		transform: translate(-100%, -50%);
	}
	&:first-of-type {
		transform: translate(0%, -50%);
	}
`;

const BarrettineContainer = styled.div`
	border-left: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.1})};
	border-right: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.1})};
  height: 4px;
  ${props => props.absolute && css`
    position: absolute;
    border: none;
    top: 50%;
    z-index: ${props => props.theme.zIndex.xm};
    left: 0;
    width: 100%;
    height: 60%;
    transform: translateY(-50%);
  `};
`;

const StepBarrettina = styled.div`
  flex-grow: 2;
  flex-shrink: 0;
  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.colors.colorChambray};
  }
`;

export {
  WrapperProgressBar,
  ProgressBarUI,
  Progress,
  Label,
  StepItem,
  BarrettineContainer,
	StepBarrettina,
	ContainerSteps
};
