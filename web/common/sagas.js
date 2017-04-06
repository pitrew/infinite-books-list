
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
		let nextBook = 0;
		if (!action.reset) {
			nextBook = yield select(booksLengthSelector);
		}
		const res = yield fetch(`/api/books/${nextBook}/${pagination.more_size}/${sort}/${filter}`, {
			method: 'get',
		});
		const data = yield res.json();
		yield put(fetchBooksSuccess(data.books, action.reset));
	} catch (err) {
		yield put(fetchBooksError('Cannot get books' + err));
	}
}

function *watchFetchBooks() {
	yield takeLatest(FETCH_BOOKS_REQUESTED, fetchBooks);
}

export default watchFetchBooks;
