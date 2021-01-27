import React from 'react';
import { NavLink } from 'react-router-dom';

import { MenuSidebarContainer } from './styles';
import { Icon } from '../base';

const MenuSidebar = 
	({ menuItems, onCloseMenu }) => 
		(
			<MenuSidebarContainer>
				{menuItems.map(item => 
					<li className={item.active ? 'active' : ''} key={item.key}>
						<NavLink className={'dflex dflex__center dflex__center--space-between'} to={item.url} onClick={onCloseMenu}>
							{item.title}
							<Icon 
								className="arrow-rotate"
								key={item.key} 
								iconKey={'arrowDown'}
								size={16}
							/>
						</NavLink>
					</li>
				)}
			</MenuSidebarContainer>
		);

export default MenuSidebar;