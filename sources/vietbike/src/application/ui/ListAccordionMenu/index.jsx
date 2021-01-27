import React from 'react';
import PropTypes from "prop-types";

import { WrapperContent } from './style';

const ListAccordionMenu = ({ listItem, paddingLink, bgColor, colorBorder }) => 
	<WrapperContent padding={paddingLink} bgColor={bgColor} colorBorder={colorBorder}>
		{listItem.map(item => <li className={`dflex dflex__center ${item.active ? 'active' : ''}`} key={item.key}>{item}</li>)}
	</WrapperContent>

ListAccordionMenu.propTypes = { 
	tcs: PropTypes.array, 
	tcsActive: PropTypes.string,
	urlTcs: PropTypes.array,
	paddingLink: PropTypes.string,
	bgColor: PropTypes.string,
	colorBorder: PropTypes.string
};

ListAccordionMenu.defaultProps = {
	tcs: [], 
	tcsActive: '',
	urlTcs: [],
	paddingLink: '0px 0 0px 24px',
	bgColor: '#012C4F',
	colorBorder: '#465C7A'
};

export default ListAccordionMenu;