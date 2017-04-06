import { createSelector } from 'reselect';

const booksState = state => state.books;
const paginationState = state => state.pagination;
const sortState = state => state.sort;
const filterState = state => state.filter;

export const booksSelector = createSelector(booksState, books => books);
export const booksLengthSelector = createSelector(booksState, books => books.length);

export const paginationSelector = createSelector(paginationState, pagination => pagination);

export const sortSelector = createSelector(sortState, sort => {
	return `${sort.key},${sort.order}`;
});
export const filterSelector = createSelector(filterState, filter => {
	const filterString = Object.keys(filter).reduce((acc, key) => {
		acc.push(`${key}=${filter[key]}`);
		return acc;
	}, []).join(',');

	return filterString;
});

export const filterObjSelector = createSelector(filterState, filter => filter);
export const sortObjSelector = createSelector(sortState, sort => sort);
