import React from "react";

import CardTable from "./../CardTable";
import SensorInfo from "./../SensorInfo";
import { WrapperTablesChart, ColumnTables, CardChart } from './style';

const WrapperTables = ({ data, isThresholds, changeOpenModal }) => {
	if (data.length >= 0) {
		return (
			<WrapperTablesChart className="dflex padding-left-8 padding-top-32 padding-right-8">
				{data.map(column => renderCardContent(column, isThresholds, changeOpenModal))}
			</WrapperTablesChart>
		);
	} else {
		return (
			<React.Fragment>
				{data.singleColumn &&
					<div className="padding-left-8 padding-right-8">
						{data.singleColumn.map(column => renderCardContent(column, isThresholds, changeOpenModal))}
					</div>
				}
				<WrapperTablesChart className="dflex padding-left-8 padding-top-32 padding-right-8">
					{data.columns.map(column => renderCardContent(column, isThresholds, changeOpenModal))}
				</WrapperTablesChart>
			</React.Fragment>
		);
	}

}

WrapperTables.defaultProps = {
	data: null
};

WrapperTables.propTypes = {
};

const renderInnerCard = (block, isThresholds, changeOpenModal) => {
	return block.cards
		? block.cards.map((card, j) => {
			switch (card.type) {
				case 'chart':
					return (
						<CardTable title={card.title} key={`${card.title}-${j}`} metadata={card.metadata} className={card.cards && 'container-article'}>
							{card.cards ? card.chart : <CardChart>{card.chart}</CardChart>}
							{card.info && <SensorInfo info={card.info} isThresholds={isThresholds} onClick={changeOpenModal} />}
							{card.cards && renderInnerCard(card.cards, isThresholds, changeOpenModal)}
						</CardTable>
					)
				default:
					return (
						<CardTable metadata={card.metadata} title={card.title} key={`${card.title}-${j}`} className={card.cards && 'container-article'}>
							{card.info && <SensorInfo info={card.info} isThresholds={isThresholds} onClick={changeOpenModal} />}
							{card.cards && renderInnerCard(card.cards, isThresholds, changeOpenModal)}
						</CardTable>
					);
			}
		})
		: block.map((card, j) => {
			switch (card.type) {
				case 'chart':
					return (
						<CardTable title={card.title} key={`${card.title}-${j}`} metadata={card.metadata} className={card.cards && 'container-article'}>
							{card.cards ? card.chart : <CardChart>{card.chart}</CardChart>}
							{card.info && <SensorInfo info={card.info} isThresholds={isThresholds} onClick={changeOpenModal} />}
							{card.cards && renderInnerCard(card.cards, isThresholds, changeOpenModal)}
						</CardTable>
					)
				default:
					return (
						<CardTable metadata={card.metadata} title={card.title} key={`${card.title}-${j}`} className={card.cards && 'container-article'}>
							{card.info && <SensorInfo info={card.info} isThresholds={isThresholds} onClick={changeOpenModal} />}
							{card.cards && renderInnerCard(card.cards, isThresholds, changeOpenModal)}
						</CardTable>
					);
			}
		});
}


const renderCardContent = (data, isThresholds, changeOpenModal) => {
	return data.map((block, i) => (
		<ColumnTables
			flaxBasis={block.flexBasis}
			key={`TableColumn-${i}`}
		// data-column="draggable"
		>
			{block.title
				? (
					<CardTable title={block.title} key={block.title} metadata={block.metadata}>{block.cards && renderInnerCard(block)}</CardTable>
				)
				: (
					block.cards && renderInnerCard(block, isThresholds, changeOpenModal)
				)}
		</ColumnTables>
	)
	);
}


export default WrapperTables;