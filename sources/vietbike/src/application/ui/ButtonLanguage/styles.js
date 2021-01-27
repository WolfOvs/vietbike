import styled from 'styled-components';

const ContainerLanguage = styled.div`
width: 60px;
height: 32px;
position:relative;
`;

const UlLanguage = styled.ul`
  background: ${props => props.theme.colors.colorChambray};
  transition: all 0.2s;
  padding: 0 3px;
  border: 0;
  width: 100%;
  border-radius: 20px;
  cursor: pointer;
  height: 32px;
  position: absolute;
  overflow: hidden;
  z-index: ${props => props.theme.zIndex.tooltip};
  :hover {
		height: ${props => props.buttons * 32}px;
		li .icon-rotate {
			transform: scaleY(-1);
		}
  }
`;

const LiLanguage = styled.li`
  background: ${props => props.theme.colors.colorChambray};
  padding: 0 3px;
  width: 100%;
  height: 32px;
  margin-top: 3px;
  border-radius: 20px;
  :first-child {
    margin-top: 0;
  }
`;

export { 
  UlLanguage,
  LiLanguage,
  ContainerLanguage
};
