import styled from 'styled-components';

const Switcher = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 115px;
  padding: 0 35px;

.toggle-title {
  font-size:  1em;
  line-height: 1.3;
  font-weight: 500;
  font-family: 'Ubuntu';
	text-transform:uppercase;
	margin-right: 10px;
}
.toggle-container
{
  display: flex;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 24px;
}
.toggle-checkbox
{
    position: absolute;
    width: 50px;
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
    background-color: #223045;
    height: 28px;
    width: 52px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}
.toggle-container .toggle-checkbox:checked ~ .toggle-layer
{
    background-color: #223045;
    border: solid 1px rgba(255, 255, 255, 0.2);
    height:28px;
}

.toggle-container .toggle-knob.off:before
{
  content: 'OFF';
  position: absolute;
  transform: translate(-50%,-50%);
  line-height: 25px;
  text-align: center;
  left: 90%;
  z-index: 2;
  top: 50%;
  left: 35%;
  width: 24px;
  height: 24px;
  background-color: ${props => props.theme.colors.colorTransparent({r: 82, g: 108, b: 145})};
	border-radius: 50%;
	box-shadow: 0 1px 3px 0 ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.2})}, 0 2px 1px -1px ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.12})}, ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.14})};

}

.toggle-container .toggle-checkbox:checked + .toggle-knob.on:before
{
    content: 'ON';
    background-color: ${props => props.theme.colors.colorTransparent({r: 82, g: 108, b: 145})};
    border: 1px solid #364b65;
    position: absolute;
    transform: translate(-50%,-50%);
    line-height: 25px;
    text-align: center;
    z-index: 2;
    top: 50%;
    left: 97%;
    width: 24px;
    height: 24px;
    background-color: ${props => props.theme.colors.colorTransparent({r: 82, g: 108, b: 145})};
    border-radius: 50%;
    box-shadow: 0 1px 3px 0 ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.2})}, 0 2px 1px -1px ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.12})}, ${props => props.theme.colors.colorTransparent({r: 0, g: 0, b: 0, a: 0.14})};
}

.toggle-container .toggle-knob {
  color:#fff;
  font-size: 9px;
}

.toggle-container .toggle-knob, .toggle-container .toggle-knob:before, .toggle-container .toggle-toggle-layer
{
    transition: 0.3s ease all;
}
`;

export { Switcher };