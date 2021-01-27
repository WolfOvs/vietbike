import React from 'react';

import {
	Input,
	ChartHeader,
	Icon,
	Modal,
	Button
} from "../../ui";
import { WrapperList, Item } from './style';
import { getDateString } from "../../../utils";

const TrendsListArchive = (props) => {

	const { trendsTC, handleShowModal, deliteTrend, duplicateTrend } = props;

	const [dataTrend, changeDataTrend] = React.useState(trendsTC);
	const [trendsFiltered, changeTrendsFiltered] = React.useState(trendsTC);
	const [showModal, changeshowModal] = React.useState(false);
	const [trendDelete, changeTrendDelete] = React.useState(null);

	React.useEffect(() => {
		changeDataTrend(trendsTC);
		changeTrendsFiltered(trendsTC)
	}, [trendsTC]);

	const filterData = (value, data) => {
		let newData = [...data];
		return newData.filter(el => el.name.toLowerCase().includes(value.toLowerCase()));
	}

	const changeTextFilter = (e) => {
		const dataList = filterData(e.target.value, dataTrend);
		changeTrendsFiltered(dataList);
	}

	const renderTrend = () => {
		let trends = []
		trendsFiltered && trendsFiltered.forEach(trend => {
			if (trend) {
				trends.push(
					<Item className="dflex dflex__center" key={trend.id}>
						<div className="title" onClick={() => handleShowModal(trend)}>{trend.name}</div>
						<div className="detail dflex dflex__center dflex__center--space-between">
							<ChartHeader
								values={{
									dateFrom: getDateString(new Date(trend.dateFrom)),
									dateTo: getDateString(new Date(trend.dateTo))
								}}
							/>
							<div className="dflex">
								<button onClick={() => duplicateTrend(trend)} >
									<Icon iconKey={'duplicaIcon'} size={14} />
								</button>
								<button onClick={() => {
									changeshowModal(true);
									changeTrendDelete(trend)
								}} >
									<Icon iconKey={'deleteTrendIcon'} size={14} />
								</button>
							</div>
						</div>
					</Item>
				);
			}
		});
		return trends;
	};
	
	return (
		<div className="padding-left-16 padding-right-16 padding-top-32 padding-bottom-32 wrapper-overflow">
			<div className="dflex margin-bottom-16">
				<Input
					id={'search-trends'}
					name={'search-trends'}
					placeholder={'Cerca trend per nome o per data'}
					onChange={changeTextFilter}
				/>
			</div>
			<WrapperList>
				{renderTrend()}
				{showModal &&
					<Modal
						showModal={showModal}
						onClose={() => changeshowModal(false)}
						maxWidth={'688px'}
					>
						<p className="dflex dflex__center dflex__center--space-center">Il grafico verrà eliminato in modo permanente, sei sicuro di voler procedere?</p>
						<div className="dflex dflex__center--space-evenly padding-20">
							<Button
								text={"Si, elimina definitivamente"}
								height={'28px'}
								padding={'0 8px'}
								action={() => {
									changeshowModal(false);
									deliteTrend(trendDelete.id);
								}}
							/>
							<Button
								text={"Annulla"}
								height={'28px'}
								padding={'0 8px'}
								action={() => changeshowModal(false)}
							/>
						</div>
					</Modal>
				}
			</WrapperList>
		</div>
	)
}

export default TrendsListArchive;