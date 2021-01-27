import React from 'react';
import PropTypes from "prop-types";
import { HeaderContainer, Logo, Login } from './styles';

const Header = () => {

	return (
		<HeaderContainer>
            <Logo>GoVietBike</Logo>
            <Login>Login</Login>
        </HeaderContainer>
	)
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;