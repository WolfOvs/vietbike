import React from 'react';
import PropTypes from "prop-types";

import { TooltipStyle, HeaderTooltip } from './style';
import { ButtonLink } from '../../base';

const TooltipMenu = ({ title, content}) => (
	<TooltipStyle>
		{title && <HeaderTooltip>{title}</HeaderTooltip>}
		<div>
			{content.map((el, index) => (
				<ButtonLink
					key={`${el}-${index}`}
					action={el.action}
					icon={el.icon}
					text={el.label}
				/>
			))}
		</div>
	</TooltipStyle>
)

TooltipMenu.propTypes = {
	title: PropTypes.string,
	content: PropTypes.array,
	left: PropTypes.number,
	top: PropTypes.number
};

TooltipMenu.defaultProps = {
	title: null,
	content: null,
	left: 0,
	top: 0
};

export default TooltipMenu;