import styled from 'styled-components';

const ButtonStyle = styled.button `
    border: none;
    background-color: #083853;
    border-radius: 50%;
    cursor: pointer;
    padding: 5px 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover&:enabled {
        background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83);
    }

    &:disabled {
        background-color: grey;
        cursor: unset;
    }
`;

export {
    ButtonStyle
};