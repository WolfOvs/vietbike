import styled from 'styled-components';

const WrapperImage = styled.div`
    background-image: url(${props => props.icon});
    height: 100vh;
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
`;

const WrapperForm = styled.div`
    width: 500px;
    height: 100vh;
    background: ${props => props.theme.colors.white};
    position: fixed;
    top: 0;
    right: 0;
    padding: 40px 0px 0px 50px;
    diplay: flex;
    flex-direction: column;
    font-size: 16px;
`;

const Text = styled.div`
    color: black;
    margin-bottom: 30px;
    width: 342px;
    ${props => props.required &&`
        color: ${props.theme.colors.persianRed}
    `}
`;

const WrapperLogo = styled.div`
    margin-bottom: 70px;
`;

const WrapperButton = styled.div`
    margin: 40px 0px 30px;
`;


export {
    WrapperImage,
    WrapperForm,
    Text,
    WrapperLogo,
    WrapperButton
}