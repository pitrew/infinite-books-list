
import React from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

import { booksSelector, sortObjSelector } from './common/selectors';
import { 
	fetchBooks,
	sortBooks,
} from './common/actions';

const halloweenStyle = {
	backgroundColor: 'orange',
};
const fridayStyle = {
	backgroundColor: 'greenyellow',
};
const pointer = {
	cursor: 'pointer',
};
const iconStyle = {
	height: '12px', 
	width: '12px',
};

class BooksList extends React.Component {
    constructor(props) {
    	super(props);

    	this.handleScroll = this.handleScroll.bind(this);
    }

	componentWillMount() {
		this.props.fetchBooks();
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll(event) {

		if (this.scrollTimer) {
			clearTimeout(this.scrollTimer);
		}
		this.scrollTimer = setTimeout(() => {
			const scrollTop = event.srcElement.body.scrollTop;
			const scrollHeight = event.srcElement.body.scrollHeight;

			if(window.innerHeight + scrollTop > scrollHeight - 500) {
				this.props.fetchBooks(false);	
			}			
		}, 50);
	}
	isLastFriday(day, month, year) {
	    const newYear = year + (month === 12 ? 1 : 0);
	    const firstDay = new Date(Date.UTC(newYear, month % 12, 1));
	    const toFriday = (firstDay.getDay() + 1) % 7 + 1;
	    const d = new Date(Date.UTC(newYear, month % 12, 1 - toFriday));

	    return (day === d.getUTCDate()) &&
	    	   (month === d.getUTCMonth() + 1) &&
	    	   (year === d.getUTCFullYear());
    }

	getRowStyle(publishDate, genre) {
		let rowStyle = {};

		const d = publishDate.split('/').map(x => +x);
		const day = d[1];
		const month = d[0];
		const year = d[2];

		
		const dt = new Date(Date.UTC(year, month, day));

		if (genre === 'Horror' && day === 31 && month === 10) {
			rowStyle = {...rowStyle, ...halloweenStyle};
		} else if (genre === 'Finance' && this.isLastFriday(day, month, year)) {
			rowStyle = {...rowStyle, ...fridayStyle};
		}
		return rowStyle;
	}
	render() {
		const sortBook = (this.props.sort.key === 'book' ?
							(this.props.sort.order === 'desc' ?
								<ArrowUp style={iconStyle} /> : <ArrowDown style={iconStyle} />) : '');
		const sortAuthor = (this.props.sort.key === 'author' ?
							(this.props.sort.order === 'desc' ?
								<ArrowUp style={iconStyle} /> : <ArrowDown style={iconStyle} />) : '');

		return (<div>
			<Table selectable={false}>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			      <TableRow>
			        <TableHeaderColumn onTouchTap={() => {
			        	this.props.sortBooks('book');
			        	this.props.fetchBooks();
			        }} style={pointer}>Name {sortBook}</TableHeaderColumn>
			        <TableHeaderColumn onTouchTap={() => {
			        	this.props.sortBooks('author');
			        	this.props.fetchBooks();
			        }} style={pointer}>Author {sortAuthor}</TableHeaderColumn>
			        <TableHeaderColumn>Genre</TableHeaderColumn>
			        <TableHeaderColumn>Publish date</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			    {
					this.props.books.map((book) => {
						const rowStyle = this.getRowStyle(book.publish_date, book.genre);

						return (<TableRow key={book.name} style={rowStyle}>
					        <TableRowColumn>{book.name}</TableRowColumn>
					        <TableRowColumn>{book.author.name}</TableRowColumn>
					        <TableRowColumn>{book.genre}</TableRowColumn>
					        <TableRowColumn>{book.publish_date}</TableRowColumn>
					     </TableRow>); })
				}
			    </TableBody>
			  </Table>
			
		</div>);
	}
}

const mapStateToProps = (state) => ({
	books: booksSelector(state),
	sort: sortObjSelector(state),
});

const mapDispatchToProps = {
	fetchBooks,
	sortBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
