import styled from 'styled-components';

const HomeContainer = styled.div`
	background-color: ${props => props.theme.colors.white};
	font-size:16px;
	height:100vh;
`;

const Banner = styled.div`
	background: ${props => `url(${props.img}) no-repeat top center`};
	font-size:16px;
	height:300px;
`;

const InputSearch = styled.input`
	height:50px;
	border:1px solid #000;
	border-radius:50px;
	width:50%;
	font-size:16px;
	padding: 0 20px;
	margin:20px auto;

`;

export {
	HomeContainer,
	Banner,
	InputSearch
}