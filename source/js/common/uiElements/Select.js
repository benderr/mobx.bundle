import Selector, {Creatable} from 'react-select';
import React from 'react';

class Select extends React.Component {
	render() {
		let {
			searchable = false,
			noResultsText = 'Введите текст поиска',
			openOnFocus = false,
			creatable = false, ...props
		}=this.props;
		console.log('render selector', props.name);

		if (creatable) {
			return (<Creatable ref={s => this.el = s}
							   {...props}
							   openOnFocus={openOnFocus}
							   noResultsText={noResultsText}
							   searchable={searchable}/>);
		}else{
			return (<Selector ref={s => this.el = s}
							   {...props}
							   openOnFocus={openOnFocus}
							   noResultsText={noResultsText}
							   searchable={searchable}/>);
		}
	}

	setFocus() {
		this.el && this.el.focus();
	}

	inFocus() {
		this.el && this.el.inFocus;
	}
}

Select.propTypes = Selector.propTypes;
export default Select;

