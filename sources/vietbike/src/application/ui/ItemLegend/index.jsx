import React from 'react';
import PropTypes from "prop-types";

import { Item } from './style';

const ItemLegend = ({ item }) => (
	<Item colorBullet={item.color}>{item.label}</Item>
)

ItemLegend.propTypes = {
	item: PropTypes.object
};

ItemLegend.defaultProps = {
	item: {
		color: '#000000',
		label: ''
	},
};

export default ItemLegend;