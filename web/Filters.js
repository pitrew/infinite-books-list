import React from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { filterObjSelector } from './common/selectors';
import { 
	changeFilter,
	fetchBooks,
} from './common/actions';

import bookGenres from './bookGenres';

class Filters extends React.Component {
	constructor(props) {
		super(props);

		this.bookGenres = ['any', ...bookGenres];
		this.authorGenders = ['any', 'male', 'female'];
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleAuthorGenderChange = this.handleAuthorGenderChange.bind(this);
	}

	handleGenreChange(event, index, value) {
		this.props.changeFilter('genre', value);
		this.props.fetchBooks();
	}

	handleAuthorGenderChange(event, index, value) {
		this.props.changeFilter('author.gender', value);
		this.props.fetchBooks();
	}

	render() {
		return (<div>
			<SelectField
				floatingLabelText={'Genre'}
		        value={this.props.filter.genre}
		        onChange={this.handleGenreChange}
		        maxHeight={200}
		      >
		      	{ this.bookGenres.map((genre) => <MenuItem value={genre} key={genre} primaryText={genre} /> ) }
		      </SelectField>
		      <SelectField
		      	floatingLabelText={'Author gender'}
		        value={this.props.filter['author.gender']}
		        onChange={this.handleAuthorGenderChange}
		        maxHeight={200}
		      >
		      	{ this.authorGenders.map((gender) => <MenuItem value={gender} key={gender} primaryText={gender} /> ) }
		      </SelectField>
		</div>);
	}
}

const mapStateToProps = (state) => ({
	filter: filterObjSelector(state),
});

const mapDispatchToProps = {
	changeFilter,
	fetchBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
