import React from 'react';
import PropTypes from "prop-types";

import { TagList, ErrorLayer, SuccessAddedLayer } from './style';
import { Icon } from '../base';

const ItemLI = (props) => {

	const { tag, actiontag, isChecked, icons } = props;

	const [errorLink, changeErrorLink] = React.useState(false);

	return (
		<li
			onClick={e => {
				if (isChecked && isChecked(tag)) {
					e.preventDefault();
				} else {
					const valid = actiontag(tag);
					changeErrorLink(!valid);
				}
			}}
		>
			{tag.labelTrend}
			<span>{tag.tagCliente}</span>
			<Icon
				className={'icon'}
				key={isChecked ? isChecked(tag) ? icons[0] : icons[1] : icons[0]}
				iconKey={isChecked ? isChecked(tag) ? icons[0] : icons[1] : icons[0]}
				size={20}
				margin={'0 5px 0 0'}
			/>
			{errorLink && <ErrorLayer>
				Non puoi aggiungere questo dato sul grafico. E' di un'unità di misura diversa da quanto selezionato
				precedentemente.
			<Icon
					className={'icon'}
					key={'closeX'}
					iconKey={'closeX'}
					size={20}
					margin={'0 5px 0 0'}
					onClick={e => {
						e.stopPropagation();
						changeErrorLink(false);
					}}
				/>
			</ErrorLayer>
			}
		</li>
	)
};

const TrendsListTags = (props) => {

	const { tags, classStyle, showLayerAdd } = props;

	const [listTags, changeListTags] = React.useState(tags);
	const [showAdd, changeShowAdd] = React.useState(false);

	React.useEffect(() => {
		if (JSON.stringify(listTags) !== JSON.stringify(tags)) {
			changeListTags(tags);
			if(listTags && tags && showLayerAdd && tags.length > listTags.length) {
				changeShowAdd(true);
				setTimeout(function() {
					changeShowAdd(false);
				}, 1000);
			}
		}
	}, [tags, listTags, showLayerAdd]);

	return (
		<React.Fragment>
			<TagList className={`${classStyle}`}>
				{listTags &&
					listTags.map((el, index) => {
						return (
							<ItemLI
								key={`${el.tagAcn}-${index}`}
								{...props}
								tag={el}
							/>
						);
					})}
			</TagList>
			{showLayerAdd && showAdd &&
				<SuccessAddedLayer>
					I dati sono stati aggiunti correttamente sul grafico.
				</SuccessAddedLayer>
			}
		</React.Fragment>
	);
}


TrendsListTags.propTypes = {
	tags: PropTypes.array,
	actiontag: PropTypes.func,
	classStyle: PropTypes.string,
	isChecked: PropTypes.func,
	icons: PropTypes.array,
	showLayerAdd: PropTypes.bool
};

TrendsListTags.defaultProps = {
	tags: [],
	actiontag: () => { },
	classStyle: '',
	isChecked: null,
	icons: ['iconaAdded', 'addIcon'],
	showLayerAdd: false
};

export default TrendsListTags;