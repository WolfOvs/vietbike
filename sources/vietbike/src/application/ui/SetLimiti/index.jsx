import React from "react";
import PropTypes from "prop-types";

import { 
    Text, 
    SetLimitiWrapper, 
    TextWrapper,
    NotificationWrapper,
    CardTextWrapper,
    CardText,
    CardValue,
    ErrorText
} from './style';
import {NotificationButton} from "../base";

const SetLimiti = ({ cabina, stationName, isNotification, isDetails, actionLimitModal, confirmLimits, confirmLimitsAction }) => {
    return (
        <SetLimitiWrapper>
            {(!isNotification && !isDetails) &&
                <Text className="title-limiti">Set Limiti</Text>
            }
            {!isDetails && 
                <TextWrapper>
                    <Text>Limite consigliato HH</Text>
                    <Text>{cabina.limiteConsigliato} Sm3/h</Text>
                </TextWrapper>}
            {isDetails && 
                <CardTextWrapper>
                    <CardText padding={'0px 0px 7px 0px'}>Limite consigliato HH</CardText>
                    <CardValue>{cabina.limiteConsigliato}  Sm3/h</CardValue>
                </CardTextWrapper>
            }
            <NotificationWrapper>
                <NotificationButton 
                    icon={'iconClose'} 
                    disabled={confirmLimits.status === 'KO' && confirmLimits.id === cabina.id && confirmLimits.name === stationName}
                    action={() => {actionLimitModal(cabina, stationName, 'NO');}} />
                <NotificationButton 
                    icon={'iconCheckmark'} 
                    disabled={confirmLimits.status === 'KO' && confirmLimits.id === cabina.id && confirmLimits.name === stationName}
                    action={() => {actionLimitModal(cabina, stationName, 'SI');}} />
            </NotificationWrapper>
            {(confirmLimits.status === 'KO' && confirmLimits.id === cabina.id && confirmLimits.name === stationName) && <ErrorText>Non è stato possibile accettare il limite, si prega di riprovare</ErrorText>}
        </SetLimitiWrapper>
    );
}

SetLimiti.propType = {

};

SetLimiti.defaultProps = {

};

export default SetLimiti;