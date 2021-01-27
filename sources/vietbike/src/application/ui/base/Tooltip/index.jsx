import React from 'react';

import { TooltipStyle, HeaderTooltip } from './style';

const Tooltip = ({ title, content }) => (
	<TooltipStyle>
		{title && <HeaderTooltip>{title}</HeaderTooltip>}
		{content && <ul>
			{content.map(el => <li className="dflex dflex__center" key={el}>
				{el}
			</li>)}
		</ul>
		}
	</TooltipStyle>
)

export default Tooltip;