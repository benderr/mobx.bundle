import * as Selector from 'react-select';
import React from 'react';

class Select extends React.Component {
	render() {
		let {searchable, noResultsText, ...props}=this.props;
		if (searchable === undefined)
			searchable = false;
		if (noResultsText === undefined)
			noResultsText = 'Введите текст поиска';
		return (
			<Selector {...props} noResultsText={noResultsText} searchable={searchable}/>);
	}
}

export default Select;

