
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import { 
	FETCH_BOOKS_REQUESTED,
	FETCH_MORE_BOOKS_REQUESTED,
} from './constants';

import { 
	fetchBooksSuccess, fetchBooksError,
	fetchMoreBooksSuccess, fetchMoreBooksError,
} from './actions';

import {
	paginationSelector,
	booksLengthSelector,
	sortSelector,
	filterSelector,
} from './selectors';

function *fetchBooks(action) {
	try {
		const pagination = yield select(paginationSelector);
		const sort = yield select(sortSelector);
		const filter = yield select(filterSelector);
		const start = pagination.page * pagination.more_size;
		const res = yield fetch(`/api/books/${start}/${pagination.more_size}/${sort}/${filter}`, {
			method: 'get',
		});
		const data = yield res.json();
		yield put(fetchBooksSuccess(data.books, data.pagination));
	} catch (err) {
		yield put(fetchBooksError('Cannot get books' + err));
	}
}

function *watchFetchBooks() {
	yield takeLatest(FETCH_BOOKS_REQUESTED, fetchBooks);
}

export default watchFetchBooks;
