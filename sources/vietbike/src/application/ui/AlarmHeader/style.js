import styled from 'styled-components';

const ChartHeaderWrapper = styled.div`
  color: ${props => props.theme.colors.white};
  .select-station {
    margin-left:10px;
  }
`;

const Label = styled.span`
  color: ${props => props.theme.colors.colorPoloBlue};
	line-height:30px;
	margin-right: 5px;
}
`;



export {
	Label,
  ChartHeaderWrapper
}