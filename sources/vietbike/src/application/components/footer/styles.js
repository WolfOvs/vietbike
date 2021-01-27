import styled from 'styled-components';

const FooterContainer = styled.div`
	padding:30px;
	color:#fff;
	background-color: ${props => props.theme.colors.vietGreen};
`

const FooterList = styled.ul`
	padding:30px;
	color:#fff;
`

const Item = styled.li`
	
`

const List = styled.ul`
	
`

export {
	FooterContainer,
	Item,
	List
}