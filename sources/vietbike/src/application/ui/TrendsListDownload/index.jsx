import React from 'react';

import { Input, Checkbox, Button } from '../base';
import { Item, WrapperItem, WrapperInput } from './style';

const TrendsListDownload = (props) => {

	const { searchInput, trendsFiltered, checkList, handleChangeCheckList, button } = props;

	return (
		<React.Fragment>
			<WrapperInput className="dflex padding-16">
				<Input
					placeholder={searchInput.placeholder}
					height={18}
					onChange={searchInput.onChange}					
				/>
			</WrapperInput>
			<WrapperItem>
				{trendsFiltered.map(trend => {
					return trend.isVisible &&
						<Item key={`${trend.id}-${trend.name}`} className="padding-16 dflex dflex__center">
							<Checkbox
								className={'margin-right-10'}
								id={`${trend.id}-${trend.name}`}
								name={trend.name}
								defaultChecked={checkList.findIndex(el => el.id === trend.id) >= 0}
								onClick={e => handleChangeCheckList(e, trend)}
							/>
							{trend.name}
						</Item>
				})}
			</WrapperItem>
			<Item className="padding-12 dflex dflex__center  dflex__center--space-center">
				<Button
					action={button.action}
					text={button.title}
					height={'28px'}
					padding={'0 8px'}
				/>
			</Item>
		</React.Fragment>
	);
}

TrendsListDownload.propTypes = {

};

TrendsListDownload.defaultProps = {

};

export default TrendsListDownload;