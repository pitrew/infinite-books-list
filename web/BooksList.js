
import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

import { booksSelector, 
	sortObjSelector, 
	paginationSelector,
	loadingSelector
} from './common/selectors';
import { 
	fetchBooks,
	sortBooks,
	setPageBooks,
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

const blur = {
  '-webkit-filter': 'blur(5px)',
  '-moz-filter': 'blur(5px)',
  '-o-filter': 'blur(5px)',
  '-ms-filter': 'blur(5px)',
  'filter': 'blur(5px)',
};

const blurLoading = {
	...blur,
  	'background-color': '#ccc'
};

const blurError = {
	...blur,
  	'background-color': '#c00'
};

class BooksList extends React.Component {
    constructor(props) {
    	super(props);
    }

	totalPages() {
		return Math.ceil(this.props.pagination.total / this.props.pagination.more_size);
	}

	handleScroll(event) {
		if ((event.srcElement.scrollTop === 0) && (this.props.pagination.page > 0)) {
			this.props.setPageBooks(this.props.pagination.page - 1);
			this.props.fetchBooks();
			event.srcElement.scrollTop = event.srcElement.scrollHeight - event.srcElement.offsetHeight - 1;
		} else if ((event.srcElement.scrollTop === event.srcElement.scrollHeight - event.srcElement.offsetHeight) &&
			(this.props.pagination.page < this.totalPages() - 1)) {
			this.props.setPageBooks(this.props.pagination.page + 1);
			this.props.fetchBooks();
			event.srcElement.scrollTop = 1;
		}
	}
    
	componentWillMount() {
		this.props.fetchBooks();
	}
	componentDidMount() {
	  this.viewport.addEventListener('scroll', (e) => {
	    this.handleScroll(e);
	  });
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

		const tableStyle = this.props.loading.error ? blurError :
			(this.props.loading.active ? blurLoading : {});

		return (<div>
			<Table selectable={false}
					height={"410px"}
					fixedHeader={true}
					fixedFooter={true}>
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
			    <TableBody displayRowCheckbox={false}
			    	style={tableStyle}
				    ref={ref => {
				    	if (ref) { 
					    	this.viewport = ReactDOM.findDOMNode(ref);
					    	this.viewport = this.viewport.parentNode; 
					    	this.viewport = this.viewport.parentNode;
					    }
				    } } >
			    {
					this.props.books.map((book) => {
						const rowStyle = this.getRowStyle(book.publish_date, book.genre);

						return (<TableRow key={book._id} style={rowStyle}>
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
	pagination: paginationSelector(state),
	loading: loadingSelector(state),
});

const mapDispatchToProps = {
	fetchBooks,
	sortBooks,
	setPageBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
