import styled from 'styled-components';

const WrapperAside = styled.aside`
	position: relative;
	background-color: ${props => props.theme.colors.colorBlueNavy};
	overflow-y: auto;
	overflow-x: hidden;
	margin-top:-1px;
	border-left: 1px solid ${ props => props.theme.colors.colorBlueNavy };
	height: 100%;
	width: 320px;
	padding: 40px;
`;

const WrapperHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 40px;
	border-bottom: 1px solid ${ props => props.theme.colors.colorCeruleanBlue };
	button {
		background-image: linear-gradient(to right, #1295d4 0%, #11a0c4 20%, #0cce83 100%);
	}
`;

const Title = styled.div`
	font-size: 22px;
	font-weight: bold;
	padding-bottom: 4px;
`;

const Subtitle = styled.div`
	font-size: 14px;
	span {
		font-weight: bold;
	}
`;

const Message = styled.div`
	font-size: 24px;
	text-align:center;
	font-weight: bold;
    padding-top: 40vh;
`;

const NotificationNumber = styled.div`
	width: 18px;
	height: 17px;
	display: block;
	background-color: red;
	color: ${ props => props.theme.colors.white };
	font-size:11px;
	font-weight: bold;
	border-radius:100%;
	text-align:center;
	right: 30px;
	top: 43px;
	position:absolute;
	padding-top: 3px;
	padding-right: 1px;
`;

const TimeLabel = styled.div`
	font-size: 14px;
	font-weight:bold;
	margin-bottom:15px;
`;

const NotificationContainer = styled.div`
	padding: 20px 0px 0px 0px;
`;

const NotificationCard = styled.div`
	padding:15px 15px 5px 15px;	
	background-color: ${ props => props.theme.colors.colorCeruleanBlue };
	border-radius:10px;
	margin-top:10px;

	div{
		.cabin {
			border-bottom: 1px dashed #000;
			padding:10px 0;
	
		}
	
		&:last-child {
			.cabin{
				border-bottom:none;
			}
		}
	}
`;

const NotificationCardContainer = styled.div`
	//padding:15px 10px;
`;

const Header = styled.div`
	display:flex;
	justify-content: space-between;
	align-items: center;
`;

const LimitiContainer = styled.div`
	
`;

const Name = styled.div`
	font-size: 16px;
	font-weight:bold;
`;

const CabinName = styled.div`
	font-size: 16px;
`;

export {
  WrapperAside,
  WrapperHeader,
  Title,
  Subtitle,
  Message,
  NotificationNumber,
  TimeLabel,
  NotificationContainer,
  NotificationCard,
  Header,
  LimitiContainer,
  Name,
  NotificationCardContainer,
  CabinName
}