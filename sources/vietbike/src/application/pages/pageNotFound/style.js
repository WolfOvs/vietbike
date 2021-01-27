import styled from 'styled-components';

const PageNotFoundUI = styled.div`
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono:300,500');
  display: flex;
  width: 100%;
  height: 100%;
    background: linear-gradient(to right, rgb(51,158,216), rgb(45,45,130), rgb(51,158,216));
    min-height: 100vh;
    min-width: 100vw;
    font-family: "Ubuntu Mono", "Liberation Mono", Consolas, monospace;
    color: rgba(255,255,255,.87);

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
    }
}
`;

export {
  PageNotFoundUI
}