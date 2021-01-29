import styled from 'styled-components';

const HeaderContainer = styled.div`
    position:relative;
    
`

const Logo = styled.div`
	font-family: 'Faster One', cursive;
	color: ${props => props.theme.colors.vietRed};
	font-size:50px;
	text-align:center;
	padding: 25px;
    background-color: #fff;
    cursor:pointer;

    @media(max-width: 768px) {
        font-size:30px;
        text-align:left;
	}
`;

const Login = styled.div`
	color: ${props => props.theme.colors.vietRed};
	font-size:16px;
    position:absolute;
    right:20px;
    top: 40px;
    font-weight: 700;

    @media(max-width: 768px) {
        top: 33px;
	}
`;

export {
    HeaderContainer,
    Logo,
    Login
}