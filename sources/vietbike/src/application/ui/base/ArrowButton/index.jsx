import React from "react";
import PropTypes from "prop-types";

import { ButtonStyle } from './style';
import Icon from "../Icon";

const ArrowButton = ({ icon, action, inactive, size }) => {
    return (
        <ButtonStyle onClick={action} disabled={inactive}>
            <Icon iconKey={icon} size={size} />
        </ButtonStyle>
    );
}

ArrowButton.propType = {

};

ArrowButton.defaultProps = {
    
};

export default ArrowButton;