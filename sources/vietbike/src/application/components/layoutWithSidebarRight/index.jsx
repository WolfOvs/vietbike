import React from 'react';

import { SidebarRight } from '../../components';
import { WrapperWithSidebar, WrapperBody } from './styles';

/**
 * Component that contain the common structure of main body and right sidebar 
 * present in all pages except in the home
 * @param {*} accordionData data that we want to show in the accordion in the right sidebar
 * @param {*} children components put inside the central component in the page
 * @param {*} action 
 * 
 */
const LayoutWithSidebarRight = ({ accordionData, children, action, 	isThresholds, changeOpenModal }) => {
	return (
		<WrapperWithSidebar className="dflex">
			<WrapperBody id='wrapper-body'>
				{children}
			</WrapperBody>
			<SidebarRight 
				accordionsData={accordionData} 
				action={action}
				isThresholds={isThresholds}
				changeOpenModal={changeOpenModal}
			/>
		</WrapperWithSidebar>
	);
}

export default LayoutWithSidebarRight;