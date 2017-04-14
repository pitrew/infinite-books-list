
import { combineReducers } from 'redux';
import { 
	FETCH_BOOKS_SUCCEEDED, 
	FETCH_BOOKS_ERROR,
	FETCH_BOOKS_REQUESTED, 
	SORT_BOOKS,
	BOOKS_FILTER_CHANGED,
	SET_PAGE_BOOKS,
} from './constants';

/**
 * Reducers to create redux state
 */
const reducers = {
	books: (state = [], action) => {
		if (action.type === FETCH_BOOKS_SUCCEEDED) {
			return action.books;
		}
		return state;
	},
	sort: (state = { key: 'none', order: 'asc' }, action) => {
		if (action.type === SORT_BOOKS) {
			if (state.key === action.key && state.order === 'desc') {
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
	pagination: (state = { more_size: 30, page: 0, total: 0 }, action) => {
		if (action.type === SET_PAGE_BOOKS) {
			const newState = {...state};
			newState.page = action.pageNum;
			return newState;
		} else if (action.type === FETCH_BOOKS_SUCCEEDED) {
			const newState = {...state};
			newState.total = action.pagination.total;
			return newState;
		}

		return state;
	},
	loading: (state = { active: true, error: false }, action) => {
		if (action.type === FETCH_BOOKS_REQUESTED) {
			return { active: true, error: false };
		} else if (action.type === FETCH_BOOKS_SUCCEEDED) {
			return { active: false, error: false };
		} else if (action.type === FETCH_BOOKS_ERROR) {
			return { active: false, error: true };
		}
		return state;
	},
};

export default combineReducers(reducers);