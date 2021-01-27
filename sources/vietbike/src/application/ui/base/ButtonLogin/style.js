import styled from 'styled-components';

const ButtonStyle = styled.button`
    border: none;
    background-color: ${props => props.theme.colors.colorDodgerBlue};
    min-width: 80px;
    width: auto;
    height: 36px;
    padding: 6px 20px 6px 20px;
    border-style: solid;
    border-width: 1px;
    transition: background 0s;
    color: ${props => props.theme.colors.white};
    cursor: pointer;
    margin-bottom: 8px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 16px;
`;

export {
	ButtonStyle
}