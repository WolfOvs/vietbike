import React from "react";
import PropTypes from "prop-types";

import { 
	TabsList, 
	TabsListItem, 
	TabsHeader, 
	TabContainer, 
	ContainerButtons, 
	WrapperTab 
} from "./style";
import { Button } from './../base';

const TabsDark = ({ items, onTabClick, onActionButtons }) => {
	const activeTab = items.findIndex(el => el.isActive);
	return (
		<WrapperTab>
			<TabsHeader>
				<TabsList>
					{items.map(item => (
						<TabsListItem
							onClick={() => onTabClick(item.key)}
							active={item.isActive}
							key={item.name}
						>
							{item.name}
						</TabsListItem>
					))}
				</TabsList>
				{onActionButtons &&
					<ContainerButtons className="dflex">
						{onActionButtons.map((button, index) => (
							<Button key={`${button.text}-${index}`} text={button.text} icon={button.icon} height={'32px'} padding={'0 16px'} action={button.onAction} />
						))}
					</ContainerButtons>
				}
			</TabsHeader>
			<TabContainer>{items[activeTab].content}</TabContainer>
		</WrapperTab>
	);
}

TabsDark.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			content: PropTypes.any,
			isActive: PropTypes.bool
		})
	),
	onTabClick: PropTypes.func,
	onActionButtons: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string.isRequired,
			icon: PropTypes.string,
			onAction: PropTypes.func
		})
	)
};

TabsDark.defaultProps = {
	items: [],
	onTabClick: () => { },
	onActionButtons: null
};


export default TabsDark;
