
import { 
	FETCH_BOOKS_REQUESTED, 
	FETCH_BOOKS_SUCCEEDED, 
	FETCH_BOOKS_ERROR, 
	SORT_BOOKS, 
	BOOKS_FILTER_CHANGED,
	SET_PAGE_BOOKS,
} from './constants';

export const fetchBooks = () => ({ 
	type: FETCH_BOOKS_REQUESTED,
});
export const fetchBooksSuccess = (books, pagination) => ({ 
	type: FETCH_BOOKS_SUCCEEDED,
	books,
	pagination,
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

export const setPageBooks = (pageNum) => ({ 
	type: SET_PAGE_BOOKS, 
	pageNum,
});


