import React from 'react';
import { withRouter } from "react-router-dom";

import { Header } from '../../ui';
import { PageWrapper, WrapperLayout, WrapperSidebar, LayerOpacity, WrapperCenter, WrapperNotification } from './styles';
import { Sidebar, SidebarRight } from "../../components";

/**
 * In this component we build the common structure that is shared between 
 * all pages in the application
 * @param {*} props 
 */
function Page(props) {

	const {
		children,
		stations,
		pathsMenu,
		stationActive,
		pageCurrent,
		tcsActive,
		accordionMenu,
		history,
		isOpenNotification,
		actionNotification,
		notificationCount,
		ridp,
		showModalAction,
		confirmLimits,
		confirmLimitsAction
	} = props;
	
	const isHome = pageCurrent.url === '/';
	let homeTimeout = null;

	//React usestate
	const [isOpenMenu, changeIsOpenMenu] = React.useState(isHome);

	if (homeTimeout) {
		clearTimeout(homeTimeout);
	}

	return (
		<PageWrapper className="dflex">
			<WrapperLayout className="dflex" isOpenMenu={isOpenMenu}>
				{isOpenMenu && !isHome &&
					<LayerOpacity onClick={() => {
						changeIsOpenMenu(!isOpenMenu)
					}}></LayerOpacity>
				}
				<WrapperSidebar
					className="dflex dflex__col"
					isOpen={isOpenMenu}
					isInHome={isHome}>
					<Sidebar
						ridp={ridp}
						onClickLogo={() => history.push('/')}
					/> 		
				</WrapperSidebar>
				<WrapperCenter className="dflex dflex__col dflex__col--big body-container">
					{children}
				</WrapperCenter>
				<WrapperNotification>
					{isOpenNotification &&
					<SidebarRight 
						notificationCount={notificationCount}
						stations={stations}
						action={actionNotification}
						showModalAction={showModalAction}
						confirmLimits={confirmLimits} 
                		confirmLimitsAction={confirmLimitsAction}
					/> }
				</WrapperNotification>
			</WrapperLayout> 
			
		</PageWrapper>
	);
}

Page.propTypes = {

};

Page.defaultProps = {

};

export default withRouter(Page);