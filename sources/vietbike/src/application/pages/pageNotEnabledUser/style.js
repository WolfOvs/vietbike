import styled from 'styled-components';

const PageNotEnable = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
	background: linear-gradient(#16263f, #193d59);
	min-height: 100vh;
	min-width: 100vw;
	color: #ffffff;

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.container,
.container > .row,
.container > .row > div {
    height: 100%;
    margin: auto;
}


#countUp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    
    .number {
        font-size: 9em;
        font-weight: 500;
        
        + .text {
            margin: 0 0 1rem;
        }
    }
    
    .text {
			font-weight: 300;
			text-align: center;
			font-size: 2.1em;
			margin-top: 20px;
			max-width: 410px;
			text-transform: uppercase;
    	font-weight: 500;
    }
}
`;

export {
	PageNotEnable
}