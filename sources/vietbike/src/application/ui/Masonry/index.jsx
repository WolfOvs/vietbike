import React from 'react';

import { MasonryWrapper, Column } from './style';
import Loading from '../LoadingPage';

const Masonry = ({ children }) => {
	return (
		<MasonryWrapper id="container-masonry">
			<div className="columns-container">
				{renderColumnDinamic(children)}
			</div>
		</MasonryWrapper>
	);
}

/**
 * Render dinamic column on resize
 * @param {*} children 
 */
const renderColumnDinamic = (children) => {
	const containerMasonry = document.querySelector('#container-masonry');
	return renderSwitchColumns(children, containerMasonry);
}

/**
 * Render column switch 1/2/3
 * @param {*} cards 
 * @param {*} containerMasonry 
 */
const renderSwitchColumns = (cards, containerMasonry) => {
	if (containerMasonry) {
		const numCol = containerMasonry.offsetWidth > 488 ? parseInt(containerMasonry.offsetWidth / 488) : 1;
		if (cards) {
			const groupColumn = group(cards, numCol);
			return groupColumn.map((card, i) => (
				<Column key={`Column-masonry-${i}`}>
					{card.map((item, index) => {
						return (<div key={`masonry-card-${index}`} className="masonry-card">{item}</div>)
					})}
				</Column>
			)
			);
		} else {
			return <Loading type={'component'} />
		}
	}
}

/**
 * Group by number of elements (n)
 * @param {*} array 
 * @param {*} n number of elements
 */
function group(array, n) {
	return array.reduce((acc, number, i) => {
		acc[i % n] = acc[i % n] || [];
		acc[i % n].push(number);
		return acc;
	}, [])
}

export default Masonry;