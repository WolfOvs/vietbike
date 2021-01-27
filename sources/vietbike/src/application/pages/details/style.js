import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`

const WrapperLayout = styled.div`
    display: flex;
    height: 100%;
    background-color:${props => props.theme.colors.colorBlueDark};
`

const WrapperSidebar = styled.div`
	position: relative;
	width: 100px;
	left: 0;
	background-color: ${props => props.theme.colors.colorBlueNavy};
	diplay: flex;
	flex-direction: column;
	align-items: center;
    padding: 40px 0px;
`
const WrapperDetails = styled.div`
    // padding: 0px 30px 37px 30px;
    padding-bottom:37px;
    width: 100%;
    overflow-y: auto;
    overlow-x: hidden;

    &::-webkit-scrollbar {
        width: 10px;
        z-index: 9999;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.colorBlueNavy};
      }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    //width: 89%;
    background-image: linear-gradient(to bottom, #052232 85%, transparent 109%);
    padding: 37px 30px 25px 30px;
    z-index: 99;

`

const Body = styled.div`
    padding: 0px 30px;
`

const ArrowWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        margin-left: 5px;
    }
`;

const Text = styled.div `
    margin-right: 10px;
    font-size: 18px;
`;

const CardsWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px 40px 0px;
    //margin-top: 120px;
    align-items: center;
    max-height: 150px;
    height: 95px;
    margin: 20px 0px;
`;

const ChartWrapper = styled.div `
    width: 100%;
`;

const Chart = styled.div `
    margin: 40px 40px;
`;

const Title = styled.div `
    font-size: 20px;
    font-weight: bold;
`;

export {
    Wrapper,
    WrapperLayout,
    WrapperSidebar,
    WrapperDetails,
    Header,
    ArrowWrapper,
    Text,
    CardsWrapper,
    ChartWrapper,
    Title,
    Chart,
    Body
}