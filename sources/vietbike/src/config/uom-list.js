/* UOM */
let uomList = {};

export const setUom = uom => {
	uomList = uom;
};

export const tag_to_uom = (tag) => {
	return uomList[tag] ? uomList[tag].label : '';
}

export const getUomList = () => {
	return uomList;
};