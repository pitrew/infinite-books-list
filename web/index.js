import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import rootSaga from './common/sagas';
import rootReducer from './common/reducers';

import BooksList from './BooksList';
import Filters from './Filters';

injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<div>
				<Filters/>
				<BooksList/>
			</div>
		</MuiThemeProvider>
  	</Provider>,
  	document.getElementById('app')
);
