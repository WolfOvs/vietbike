import styled from 'styled-components';

const Wrapper = styled.div `
    
`;

const Header = styled.div `
    margin-bottom: 20px;
`;

const Title = styled.div `
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
`;

const Subtitle = styled.div `
    display: flex;
    justify-content: space-between;
    //margin-bottom: 20px;
`;

const TitleWrapper = styled.div `
    display: flex;
    align-items: center;
    cursor: pointer;

    .title-header {
        border-bottom: 1px solid #ffffff;
    }

    &:hover {
        .title-header {
            background: -webkit-linear-gradient(282deg, #00d082, #009bd3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            border-bottom: 1px solid #00d082;
        }
    }
`;

const PropertiesWrapper = styled.div `
    background-color: #124a6a;
    border-radius: 10px;
    padding: 10px;
`;

const ArrowWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        margin-left: 5px;
    }
`;

const Text = styled.div `
    margin-right: 5px;
`;

const SetLimitiWrapper = styled.div `
    margin-top: 20px;

    .title-limiti {
        font-weight: bold;
        font-size: 16px;
    }
`;

const TextWrapper = styled.div `
    display: flex;
    justify-content: space-between;

    div:last-child {
        font-weight: bold;
    }
`;

const NotificationWrapper = styled.div `
    display: flex;
    margin-top: 10px;
`;


export {
    Wrapper,
    Header,
    Title,
    Subtitle,
    TitleWrapper,
    PropertiesWrapper,
    ArrowWrapper,
    Text,
    SetLimitiWrapper,
    TextWrapper,
    NotificationWrapper
};