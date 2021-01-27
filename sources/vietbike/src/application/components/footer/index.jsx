import React from 'react';
import PropTypes from "prop-types";
import { FooterContainer, Item, List } from './styles';

const Footer = () => {

	return (
		<FooterContainer>
            <List>
                <Item>About</Item>
                <Item>Contacts</Item>
                <Item>Privacy Policy</Item>
                <Item>Help</Item>
                <Item>Contact us</Item>
                <Item>Terms & Conditions</Item>
            </List>
        </FooterContainer>
	)
}

Footer.propTypes = {
};

Footer.defaultProps = {
};

export default Footer;