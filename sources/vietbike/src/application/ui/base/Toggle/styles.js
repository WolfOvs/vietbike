import styled from 'styled-components';

const AmaToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 165px;
  padding-bottom: 6px;

.toggle-title {
  font-size:  14px;
  color: ${props => props.theme.colors.white};
  line-height: 1.3;
}
.toggle-container
{
  display: flex;
  justify-content: center;
  position: relative;
  height: 34px;
  width: 70px;
}
.toggle-checkbox
{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}
.toggle-layer
{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    background-color: ${props => props.theme.colors.colorBlueNavy};
    height: 28px;
    width: 60px;
    border-radius: 25px;
}
.toggle-container .toggle-checkbox:checked ~ .toggle-layer
{
    background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
}

.toggle-container .toggle-knob:before
{
  content: '';
  position: absolute;
  transform: translate(-50%,-50%);
  z-index: 2;
  top: 50%;
  left: 25%;
  width: 23px;
  height: 19px;
  background-color: ${props => props.theme.colors.white};
	border-radius: 24px;
	box-shadow: 0 1px 3px 0 ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.2})}, 0 2px 1px -1px ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.12})}, ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.14})};
}

.toggle-container .toggle-checkbox:checked + .toggle-knob:before
{
    content: '';
    left: 62%;
    background-color:  ${props => props.theme.colors.white};
}

.toggle-container .toggle-knob, .toggle-container .toggle-knob:before, .toggle-container .toggle-toggle-layer
{
    transition: 0.3s ease all;
}
`;

export {AmaToggle};