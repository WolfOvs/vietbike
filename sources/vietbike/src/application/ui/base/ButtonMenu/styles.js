import styled from 'styled-components';

const HamburgherMenu = styled.div`
  cursor: pointer;
  padding: 6px 3px;
  margin-right: 24px;
  .bar1, .bar2, .bar3 {
    width: 18px;
    height: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 2px;
  }
  .bar2 {
    margin: 3px 0;
	}
	&.change{
		.bar1 {
			-webkit-transform: rotate(-45deg) translate(-9px, 6px);
			transform: rotate(-45deg) translate(-4px, 4px);
		}
		.bar2 {opacity: 0;}
		.bar3 {
			-webkit-transform: rotate(45deg) translate(-8px, -8px);
			transform: rotate(45deg) translate(-3px, -4px);
		}
	}
`;

export {
  HamburgherMenu
}