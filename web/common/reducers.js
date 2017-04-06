
import { combineReducers } from 'redux';
import { 
	FETCH_BOOKS_SUCCEEDED, SORT_BOOKS, BOOKS_FILTER_CHANGED,
} from './constants';

/**
 * Reducers to create redux state
 */
const reducers = {
	books: (state = [], action) => {
		if (action.type === FETCH_BOOKS_SUCCEEDED) {
			if (action.newList) {
				return action.books;	
			} else {
				return state.concat(action.books);
			}
		}
		return state;
	},
	sort: (state = { key: 'none', order: 'asc' }, action) => {
		if (action.type === SORT_BOOKS) {
			if (state.order === 'desc') {
				return { key: 'none', order: 'asc' };
			} else if (action.key === state.key) {
				return { key: action.key, order: 'desc' };
			}
			return { key: action.key, order: 'asc' };
		}
		return state;
	},
	filter: (state = { genre: 'any', 'author.gender': 'any' }, action) => {
		if (action.type === BOOKS_FILTER_CHANGED) {
			const newState = {...state};
			newState[action.key] = action.value;
			return newState;
		}
		return state;
	},
	pagination: (state = { more_size: 50 }, action) => state,
};

export default combineReducers(reducers);