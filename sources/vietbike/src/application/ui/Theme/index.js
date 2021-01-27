import colors from './partials/colors';
import constants from './partials/constants';
import fonts from './partials/fonts';
import zIndex from './partials/zIndex';

function theme() {
  const themeObject = {
    colors,
    constants,
    fonts,
    zIndex,
  };
  return themeObject;
}

export default theme;
