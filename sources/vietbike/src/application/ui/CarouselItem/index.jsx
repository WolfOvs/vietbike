import React from "react";
import PropTypes from "prop-types";

import { 
    Wrapper, 
    Header, 
    Title,
    Subtitle,
    TitleWrapper, 
    PropertiesWrapper, 
    ArrowWrapper, 
    Text, 
    SetLimitiWrapper, 
    TextWrapper,
    NotificationWrapper
} from './style';
import Icon from "../base/Icon";
import {ArrowButton} from "../base";
import SetLimiti from "../SetLimiti";

const CarouselItem = ({ station, props }) => {
    const [activeIndex, changeActiveIndex] = React.useState(0);
    const [length, changeLength] = React.useState(station.impiantoDiRiduzione.length);
    const [cabinHover, setHover] = React.useState(false);

    const cabina = station.impiantoDiRiduzione[activeIndex];
    const goToPrevSlide = () => {
        let index = activeIndex;
        let lengthValue = length;
        if(index < 1) {
            index = lengthValue - 1;
        } else {
            index--;
        }
        changeActiveIndex(index);
      }

    const goToNextSlide = () => {
        let index = activeIndex;
        let lengthValue = length;
        if(index === lengthValue - 1) {
            index = 0
        } else {
            index++;
        }
        changeActiveIndex(index);
      }

    const changeIcon = () => {
    setHover(!cabinHover);
    }

    const getNotification = (station, cabin) => {
		return (station.notification && cabin.limiteConsigliato > 0 && station.state != 1);
    }

    const formatDate = (value) => {
        let number = value.replaceAll(".", "");
        let operationSign = number > 0  ? '+ ' : number < 0 ? '- ' : '';
        return operationSign + value.replace(/-(?=\d)/,"");
    }
    
    return (
        <Wrapper>
            <Header>
                <Title>{station.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase()).replace(/(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d/g, x => x.toUpperCase())}</Title>
                <Subtitle>
                    <TitleWrapper onClick={() => {props.history.push({
                        pathname: `/detail/id=${station.id}/idCabina=${cabina.id}`,
                        stationData: station,
                        cabin: cabina,
                        id: station.id,
                        updateTime: props.updateInfoTime,
                        ridp: localStorage.getItem('RIDP'),
                        });
                    }} 
                        onMouseOver={changeIcon} 
                        onMouseOut={changeIcon}>
                        <Text  className="title-header">CAB {cabina.name}</Text>
                        <Icon iconKey={cabinHover ? 'iconForwardGreen' : 'iconForward'} size={25} />
                    </TitleWrapper>
                    <ArrowWrapper>
                    <Text>{activeIndex + 1} / {length} </Text>
                        <ArrowButton 
                            icon={'iconArrowBack'} 
                            action={goToPrevSlide}
                            size={15}
                            inactive={(length <= 1)} />
                        <ArrowButton 
                            icon={'iconArrowForward'} 
                            action={goToNextSlide}
                            size={15}
                            inactive={(length <= 1)} />
                    </ArrowWrapper>
                </Subtitle>
            </Header>
            <PropertiesWrapper>
                {station.type !== 1 && <TextWrapper>
                    <Text>Pressione Monte</Text>
                    {cabina.pressioneIN &&
                        <Text>{cabina.pressioneIN} bar</Text>
                    }
                    {!cabina.pressioneIN &&
                        <Text>-</Text>
                    }
                </TextWrapper>}
                <TextWrapper>
                    <Text>Pressione Valle</Text>
                    {cabina.pressioneOUT &&
                        <Text>{cabina.pressioneOUT} bar</Text>
                    }
                    {!cabina.pressioneOUT &&
                        <Text>-</Text>
                    }
                </TextWrapper>
                {station.type === 1 && <TextWrapper>
                    <Text>Nomina</Text>
                    {station.valoreNomina &&
                        <Text>{formatDate(station.valoreNomina)} Sm3/h</Text>
                    }
                </TextWrapper>}
                <TextWrapper>
                    <Text>Portata</Text> 
                    {cabina.portata &&
                        <Text>{formatDate(cabina.portata)} Sm3/h</Text>
                    }
                    {!cabina.portata &&
                        <Text>-</Text>
                    }
                </TextWrapper>
                <TextWrapper>
                    <Text>Limite</Text>
                    {cabina.limite &&
                        <Text>{formatDate(cabina.limite)} Sm3/h</Text>
                    }
                    {!cabina.limite &&
                        <Text>-</Text>
                    }
                </TextWrapper>
            </PropertiesWrapper>
            {getNotification(station, cabina)  && <SetLimiti 
                cabina={cabina} 
                stationName={station.name} 
                actionLimitModal={props.showModalAction} 
                confirmLimits={props.confirmLimits} 
                confirmLimitsAction={props.confirmLimitsAction} />}
        </Wrapper>
    );
}

CarouselItem.propType = {

};

CarouselItem.defaultProps = {

};

export default CarouselItem;