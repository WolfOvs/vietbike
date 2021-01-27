import 'react-app-polyfill/ie9';
import './polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { IntlProvider, addLocaleData } from 'react-intl';
import './styles/index.scss';

import App from './App'
import * as serviceWorker from './serviceWorker';

// import for languages
import it from './languages/it.json'
import en from './languages/en.json'
import locale_en from 'react-intl/locale-data/en';
import locale_it from 'react-intl/locale-data/it';

addLocaleData([...locale_en, ...locale_it]);
const { store } = configureStore();
let language = sessionStorage.getItem('language') || 'it';
const translations = {
	'it': it,
	'en': en
}
// Create a global function to get words from dictionary everywhere in the application
const intlProvider = new IntlProvider({ locale: language, messages: translations[language] });
const { intl } = intlProvider.getChildContext();
window.dictionary = (id) => {
	return intl.formatMessage({ id });
};

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider locale={language} messages={translations[language]}>
		<App />
		</IntlProvider>
	</Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

