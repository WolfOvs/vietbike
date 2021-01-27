import React from "react";
import PropTypes from "prop-types";
import { CardWrapper, Header, CardContent, DotMenu } from "./style";

import { Button, Icon, TooltipMenu } from '../base';

const CardChart = ({ title, children, onExpand, menuList }) => {
	
	const [isOpenTooltip, toggleTooltip] = React.useState(false);
	
	return (
		<CardWrapper>
			<Header>
				{title}
				<div className="dflex">
					{onExpand && <Button text={'Espandi'} action={onExpand} height={'28px'} />}
					{menuList && 
						<DotMenu onClick={() => toggleTooltip(!isOpenTooltip)}>
						<Icon iconKey={'menuCardIcon'} size={18} />
						{isOpenTooltip &&
							<div className="tooltip">
								<TooltipMenu
									content={menuList}
								/>
							</div>
						}
					</DotMenu>}
				</div>
			</Header>
			<CardContent className='container-article'>{children}</CardContent>
		</CardWrapper>
	);
};

CardChart.propTypes = {
	title: PropTypes.string.isRequired,
	onExpand: PropTypes.func,
	menuList: PropTypes.array
};

CardChart.defaultProps = {
	title: '',
	onExpand: () =>{},
	menuList: null
};

export default CardChart;
