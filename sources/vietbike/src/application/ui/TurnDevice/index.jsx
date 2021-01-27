import React from 'react';

import { TurnDeviseWrapper } from './styles';
import Icon from '../base/Icon';

const TurnDevice = () => 
	(	
		<TurnDeviseWrapper className="dflex dflex__center dflex__center--space-center">
			<Icon iconKey={'iconRotateDevice'} size={108}/>
		</TurnDeviseWrapper>
	);

export default TurnDevice;