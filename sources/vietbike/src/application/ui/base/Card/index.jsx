import React from "react";
import PropTypes from "prop-types";

import { WrapperItem, CardWrapper, IconWrapper, NotificationWrapper, TextWrapper, ValueWrapper } from './style';
import { Icon, NotificationButton } from "../../base";
import { SetLimiti } from "../../../ui";

const types = [{
    title: 'Pressione Monte',
    unitOfMeasure: 'bar',
    icon: 'iconRightPressione',
    color: '#00d183'
},
{
    title: 'Pressione Valle',
    unitOfMeasure: 'bar',
    icon: 'iconLeftPressione',
    color: '#016ee5'
},
{
    title: 'Nomina G/G MAX',
    unitOfMeasure: 'Sm3/h',
    icon: 'iconNomina',
    color: '#ee598b'
},
{
    title: 'Portata',
    unitOfMeasure: 'Sm3/h',
    icon: 'iconPortata',
    color: '#596bee'

},
{
    title: 'Limite',
    unitOfMeasure: 'Sm3/h',
    icon: 'iconLimite',
    color: '#ee7c59'
},
{
    title: 'Limite consigliato HH',
    unitOfMeasure: 'Sm3/h',
},
]



const Card = ({ title, value, stationName, actionLimitModal, confirmLimits, confirmLimitsAction }) => {

    const formatDate = (title, value) => {
        if(title === 'Portata' || title ===  'Limite' || title ===  'Nomina G/G MAX') {
            let number = value.replaceAll(".", "");
            let operationSign = number > 0  ? '+ ' : number < 0 ? '- ' : '';
            return operationSign + value.replace(/-(?=\d)/,"");
        } else {
            return value.replace(/-(?=\d)/,"");
        }

    }

    return(
        <WrapperItem>
        {
            types.map((type, index) => {
                if(type.title === title && title !== 'Limite consigliato HH' ) {
                    return(
                        <CardWrapper backgroundColor={'#083853'} key={index}>
                            <IconWrapper backgroundColor={type.color}>
                                <Icon iconKey={type.icon} size={20} />
                            </IconWrapper>
                            <TextWrapper padding={'15px 0px 7px 0px'}>{type.title}</TextWrapper>
                            {value && <ValueWrapper>
                                {formatDate(type.title, value) + ' ' + type.unitOfMeasure}</ValueWrapper>}
                            {!value && <ValueWrapper>-</ValueWrapper>}
                        </CardWrapper>
                    );
                }else if(type.title === title && title === 'Limite consigliato HH') {
                    return(
                        <CardWrapper backgroundColor={'#14628f'} key={index}>
                            <SetLimiti 
                                cabina={value}
                                isDetails={true}
                                stationName={stationName}
                                actionLimitModal={actionLimitModal}
                                confirmLimits={confirmLimits} 
                		        confirmLimitsAction={confirmLimitsAction}
                            />
                        </CardWrapper>
                    ); 
                }
            })
        }
        
        </WrapperItem>
        )
    

}

Card.propType = {

};

Card.defaultProps = {
    
};

export default Card;