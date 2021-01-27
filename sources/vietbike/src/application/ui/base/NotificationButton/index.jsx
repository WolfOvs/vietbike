import React from "react";
import PropTypes from "prop-types";

import { ButtonStyle } from './style';
import Icon from "../Icon";

const NotificationButton = ({ icon, action, disabled }) => {

    return (
        <ButtonStyle disabled={disabled} onClick={action}>
            <Icon iconKey={icon} size={20} />
        </ButtonStyle>
    );
}

NotificationButton.propType = {

};

NotificationButton.defaultProps = {

};

export default NotificationButton;