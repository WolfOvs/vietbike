import * as Constants from './constants';

const portrait = (width, height) => width < height;
const landscape = (width, height) => width > height;

/**
 * Render page on block turn ro device mobile
 * @param {*} widthWindow 
 * @param {*} heightWindow 
 * @param {*} themeValue constants theme
 */
export const onTurnDevice = (widthWindow, heightWindow, themeValue) => {
	const isTabletAndNotMobile = widthWindow >= themeValue.constants.BREAKPOINT_MOBILE && widthWindow <= themeValue.constants.BREAKPOINT_TABLET;
	const isMobileLandscape = widthWindow < themeValue.constants.BREAKPOINT_MOBILE && landscape(widthWindow, heightWindow);
	if( Constants.isMobileDevice ) {
		if(isMobileLandscape){
			return true;
		}else {
			if(isTabletAndNotMobile){
				if(portrait(widthWindow, heightWindow)) {
					return true;
				}else {
					return heightWindow < 400;
				}
			}else {
				return false;
			}
		}
	}
}

/**
 * Return true if obj1 === obj2
 * @param {*} obj1 
 * @param {*} obj2 
 */
export const isEqualToObject = (obj1, obj2) => {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}