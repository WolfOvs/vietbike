import { getLabelByTagUi, getValueAndUomByTag, getValueByTag, getColorByTreshOld } from './utilsDictionaries';

export const getListParamitersSidebar = (data, labels, tagList, key, thresholds) => {
	if (data && labels) {
		const dataList = labels.data.map(label => {
			const tag = getLabelByTagUi(tagList, label.tagUi, 'tagAcn');
			const tagAcn = tag.split('_')[1];
			let dataThreshols = data;
			if (tag.split('_')[0] !== 'S') {
				dataThreshols = data.tcs && data.tcs.find(el => Number(el.id) === Number(tag.split('_')[0]));
			}
			const valueLabel = label.value ? label.value : dataThreshols && getValueAndUomByTag(dataThreshols, tagAcn);
			const valueThreshold = getValueByTag(dataThreshols, tagAcn);
			const labelPAram = getLabelByTagUi(tagList, label.tagUi, 'labelTooltip');
			return {
				label: labelPAram,
				value: valueLabel,
				tag: tag,
				tagUi: label.tagUi,
				tooltip: label.tooltip,
				class: getColorByTreshOld(valueThreshold, thresholds && thresholds.find(el => el.tag === tag))
			};
		});
		return ({
			key: key,
			title: labels.title,
			data: dataList
		});
	}
	return [];
}
