import styled from 'styled-components';

const CustomRadio = styled.input`
	width: 20px;
	height: 20px;
	position: relative;
	cursor: pointer;
	border-radius: 50%;
	border: 3px solid ${props => props.theme.colors.colorBlueNavy};
    appearance: none;
    margin-right: 12px;

	&:checked {
		background-image: linear-gradient(to right,#1295d4 0%,#11a0c4 20%,#0cce83 100%);
        border: none;
        
        &:before {
            content: '';
            position: absolute;
            top: 10%;
            left: 11%;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            background-color: ${props => props.theme.colors.colorCeruleanBlue};
        }
    
        &:after {
            content: '';
            position: absolute;
            top: 21%;
            left: 23%;
            border-radius: 50%;
            width: 11px;
            height: 11px;
            background-image: linear-gradient(to right,#1295d4 0%,#11a0c4 20%,#0cce83 100%);
        }
    }
    
`;

export {
	CustomRadio
}