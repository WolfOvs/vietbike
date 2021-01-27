import styled from 'styled-components';
import { keyframes } from 'styled-components'

const FadeInOut = keyframes`
    0% {opacity:0;}
    8% {opacity:1;}
    92% {opacity:1;}
    100% {opacity:0;}
    `;


const Text = styled.div `
    margin-right: 5px;
    font-size: 14px;
`;

const SetLimitiWrapper = styled.div `
    margin-top: 10px;

    .title-limiti {
        font-weight: bold;
        font-size: 16px;
    }
`;

const TextWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;

    div:last-child {
        font-weight: bold;
        font-size: 16px;
    }
`;

const NotificationWrapper = styled.div `
    display: flex;
    margin-top: 10px;
`;

const CardTextWrapper = styled.div `
    
`;

const CardText = styled.div `
    font-size: 12px;
    padding: ${props => props.padding};
`;

const CardValue = styled.div `
    font-size: 20px;
    font-weight: bold;
`;

const ErrorText = styled.div`
	font-size: 14px;
	font-weight: bold;
    color: ${props => props.theme.colors.colorWarning};
    padding-top: 10px;
    animation: ${FadeInOut} ease 5s;
`;




export {
    Text,
    SetLimitiWrapper,
    TextWrapper,
    NotificationWrapper,
    CardTextWrapper,
    CardText,
    CardValue,
    ErrorText
};