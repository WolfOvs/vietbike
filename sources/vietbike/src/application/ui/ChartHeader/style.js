import styled from "styled-components";

const ChartHeaderWrapper = styled.div`
`;

const Row = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-size: .9em;
  color: ${props => props.theme.colors.colorPoloBlue}
`;

const ActionButton = styled.div`
  font-size: .9em;
  background-color: transparent;
  border: none;
  cursor:pointer;
  float:right;
  padding-right:0px;
  position:relative;
  color: ${props => props.theme.colors.white};
  span {
    margin-left: 5px;
  }
  .tooltip-chart-header {
		display: none;
	}
	&:hover {
		.tooltip-chart-header {
			display: block;
		}
	}
`;

const Value = styled.span`
  font-size: .9em;
  margin:0 5px;
  color: ${props => props.theme.colors.white};
`;

const Input = styled.span`
  font-size: .9em;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.colorMidnight};
  border-radius: 4px;
  padding: 5px;
  margin:0 5px;
`; 

export { ChartHeaderWrapper, Label, Input, Row, Value, ActionButton };
