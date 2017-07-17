import React from 'react'
import PropTypes from 'prop-types'

class ListFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false};
	}

	close() {
		this.el && this.el.classList.remove('visible');
		setTimeout(() => this.setState({isOpen: false}), 500);
	}

	open() {
		this.setState({isOpen: true}, () => {
			setTimeout(() => this.el && this.el.classList.add('visible'), 10);
		});
	}

	render() {
		const {isOpen}=this.state;
		const {children}=this.props;

		if (!isOpen)
			return null;

		return (<div ref={el => this.el = el} class="filter_panel right0"
					 onMouseLeave={::this.close}>
			{children}
		</div>);
	}
}

ListFilter.propTypes = {};

export default ListFilter;