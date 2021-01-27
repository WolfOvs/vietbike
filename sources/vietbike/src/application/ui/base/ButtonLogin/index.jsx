import React from "react";
import PropTypes from "prop-types";

import {ButtonStyle} from './style';

function ButtonLogin(props) {
    const {onClick} = props;

    return(
        <ButtonStyle onClick={onClick}>
            Sign In
        </ButtonStyle>
    );
}

ButtonLogin.propType = {

};

ButtonLogin.defaultProps = {

};

export default ButtonLogin;