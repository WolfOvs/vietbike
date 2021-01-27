import styled from 'styled-components';

const ButtonStyle = styled.button `
    border: none;
    background-color: #083853;
    border-radius: 10px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    &:hover&:enabled {
        background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83);
    }
`;

export {
    ButtonStyle
};