import styled from 'styled-components';

const ButtonStyle = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-left: 20px;
	height: ${props => props.height};
	width: ${props => props.width};
	cursor: pointer;
	font-size: 15px;
	color: ${props => props.theme.colors.white};
	border: solid 0px ${props => props.theme.colors.colorTransparent({a: 0.2})};
  	background-color: ${props => props.theme.colors.colorCeruleanBlue};
	border-radius: 8px;
	padding: ${props => props.padding};
	font-weight:500;
	text-transform: uppercase;
	letter-spacing:0.5px;
	.tooltip {
		display: none;
		width: 100%;
		height: 100%;
	}
	
	&:hover {
		.tooltip {
			display: block;
		}
		background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
	}

	.shake {
		  animation: bellshake 1s cubic-bezier(.3,.7,.9,.97) both;
		  backface-visibility: hidden;
		  transform-origin: top right;
		  animation-iteration-count: infinite;
	  }
	  
	  @keyframes bellshake {
		0% { transform: rotate(0); }
		15% { transform: rotate(-5deg); }
		30% { transform: rotate(-5deg); }
		45% { transform: rotate(4deg); }
		60% { transform: rotate(-4deg); }
		75% { transform: rotate(2deg); }
		85% { transform: rotate(-2deg); }
		92% { transform: rotate(1deg); }
		100% { transform: rotate(0); }
	  }
`;



export {
	ButtonStyle,
};