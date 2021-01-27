import styled from 'styled-components';

const WrapperItem = styled.div `
    flex-grow: 1;
    width: 19%;
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const CardWrapper = styled.div `
    background-color: ${props => props.backgroundColor};
    padding: 15px;
    border-radius: 10px;
    min-height: 95px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const IconWrapper = styled.div `
    background-color: ${props => props.backgroundColor};
    width: 33px;
    height: 33px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextWrapper = styled.div `
    font-size: 12px;
    padding: ${props => props.padding};
`;

const NotificationWrapper = styled.div `
    display: flex;
    margin-top: 10px;
`;

const ValueWrapper = styled.div `
    font-size: 20px;
    font-weight: bold;
`;


export {
    WrapperItem,
    CardWrapper, 
    IconWrapper, 
    NotificationWrapper, 
    TextWrapper,
    ValueWrapper
}