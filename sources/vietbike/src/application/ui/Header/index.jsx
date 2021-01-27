import React from 'react';

import { HeaderWrapper } from './styles.js';
import SnamLogo from '../base/SnamLogo';
import ButtonLanguage from '../ButtonLanguage';
import ButtonMenu from '../base/ButtonMenu';
import Breadcrumb from "../base/Breadcrumb";
import { WrapperBreadcrumb } from '../base/Breadcrumb/styles.js';

const Header = ({ onClickMenu, isOpenMenu, onClickLogo, pageCurrent }) => (
	<HeaderWrapper className="dflex dflex__center dflex__center--space-between">
		<div className="dflex dflex__center">
			<ButtonMenu onClickButtonMenu={onClickMenu} isChange={isOpenMenu}/>
			<SnamLogo title={''} onClickLogo={onClickLogo}/>
			<WrapperBreadcrumb>
				<Breadcrumb paths={[{
					key: 'home',
					title: 'Home',
					url: pageCurrent.url
				}]} />
			</WrapperBreadcrumb>
		</div>	
		<ButtonLanguage />
	</HeaderWrapper>
);

export default Header;