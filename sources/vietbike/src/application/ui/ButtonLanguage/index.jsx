import React from 'react';
import PropTypes from 'prop-types';

import { UlLanguage, LiLanguage, ContainerLanguage } from './styles';
import Icon from '../base/Icon';


const changeLanguage = (ln) => {
	// TODO uncommment these rows to active multilanguage
	//sessionStorage.setItem('language', ln);
	//location.reload();
}

const getMainLanguageIcon = () => {
	let language = sessionStorage.getItem('language') || 'it';
	switch (language) {
		case 'it':
			return 'flagItaly';
		case 'en':
			return 'flagEnglish';
		default:
			return 'flagItaly';
	}
}

const getSecondaryLanguageIcon = () => {
	let language = sessionStorage.getItem('language') || 'it';
	switch (language) {
		case 'it':
			return 'flagEnglish';
		case 'en':
			return 'flagItaly';
		default:
			return 'flagEnglish';
	}
}
// TODO MODIFY TO SUPPORT MORE LANGUAGES
const getSecondaryLanguage = () => {
	let language = sessionStorage.getItem('language') || 'it';
	switch (language) {
		case 'it':
			return 'en';
		case 'en':
			return 'it';
		default:
			return 'en';
	}
}

const ButtonLanguage = () => {

	return (
		<ContainerLanguage>
			<UlLanguage buttons={2}>
				<LiLanguage className="dflex dflex__center dflex__center--space-between">
					<Icon iconKey={getMainLanguageIcon()} size={24} />
					<Icon className="icon-rotate" iconKey={'arrowDown'} size={16} margin={'0 13px 0 0'} />
				</LiLanguage>
				<LiLanguage onClick={() => changeLanguage(getSecondaryLanguage())}>
					<Icon iconKey={getSecondaryLanguageIcon()} size={24} />
				</LiLanguage>
			</UlLanguage>
		</ContainerLanguage>
	);
}

ButtonLanguage.propTypes = {
	onClick: PropTypes.func
};

ButtonLanguage.defaultProps = {
	onClick: () => { }
};

export default ButtonLanguage;