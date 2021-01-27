import React from "react";
import PropTypes from "prop-types";

import { Tab, BtnTab } from "./style";

const Tabs = (props) => {

	const { itemsTab, currentTab, classStyle, children, borderTab } = props;

	return (
		<Tab borderTab={borderTab} className={`dflex dflex__center ${classStyle}`}>
			{itemsTab && itemsTab.map(item => (
				<BtnTab
					key={item.key}
					onClick={item.action}
					active={item.key === currentTab}
				>
					{item.text}
				</BtnTab>
			))}
			{children}
		</Tab>
	);
}

Tabs.propTypes = {
	itemsTab: PropTypes.array,
	currentTab: PropTypes.string,
	classStyle: PropTypes.string,
	borderTab: PropTypes.string
};

Tabs.defaultProps = {
	itemsTab: null,
	currentTab: '',
	classStyle: '',
	borderTab: 'solid 1px rgba(255, 255, 255, 0.2)'
};

export default Tabs;
