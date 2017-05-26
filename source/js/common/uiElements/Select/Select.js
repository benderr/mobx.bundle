import * as Selector from 'react-select';
import React from 'react';
import './style.styl';

class Select extends React.Component {
	render() {
		let {searchable, ...props}=this.props;
		if (searchable === undefined)
			searchable = false;
		return (<Selector {...props} searchable={searchable}/>);
	}
}

export default Select;

