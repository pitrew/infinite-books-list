
import { 
	FETCH_BOOKS_REQUESTED, FETCH_BOOKS_SUCCEEDED, FETCH_BOOKS_ERROR, SORT_BOOKS, BOOKS_FILTER_CHANGED,
} from './constants';

export const fetchBooks = (reset = true) => ({ 
	type: FETCH_BOOKS_REQUESTED,
	reset,
});
export const fetchBooksSuccess = (books, newList) => ({ 
	type: FETCH_BOOKS_SUCCEEDED,
	books,
	newList,
});
export const fetchBooksError = (err) => ({ 
	type: FETCH_BOOKS_ERROR, 
	err,
});

export const sortBooks = (key) => ({ 
	type: SORT_BOOKS, 
	key,
});

export const changeFilter = (key, value) => ({ 
	type: BOOKS_FILTER_CHANGED, 
	key,
	value,
});
