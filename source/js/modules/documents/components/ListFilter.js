import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import PropTypes from 'prop-types'

class ListFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false};
	}

	componentDidMount() {
		this.props.setInstance(this);
	}

	componentWillUnmount() {
		this.props.setInstance(null);
	}

	close() {
		if (!this.isOpen())
			return;

		if (this.props.isClosable && !this.props.isClosable())
			return;

		this.el && this.el.classList.remove('visible');
		setTimeout(() => this.setState({isOpen: false}), 500);
	}

	open() {
		if (this.isOpen())
			return;

		this.setState({isOpen: true}, () => {
			setTimeout(() => this.el && this.el.classList.add('visible'), 10);
		});
	}

	handleClickOutside(e) {
		if (!searchParentsIgnore(e, this.props.ignoreCloseSelect))
			return false;

		this.close();


		function searchParentsIgnore(event, dataIgnore = false) {
			if (!dataIgnore)
				return true;
			let target = event.target;

			while (target != null) {
				// e.target.parentNode.parentNode.parentNode.parentNode.attributes['data-ignore'].nodeValue
				if (target.attributes && target.attributes['data-ignore'] && target.attributes['data-ignore'].nodeValue == dataIgnore) {
					return false;
				}
				target = target.parentNode;
			}
			return true;
		}
	}

	onMouseLeave() {
		this.close();
	}

	isOpen() {
		return this.state.isOpen;
	}

	render() {
		const {isOpen} = this.state;

		// if (!isOpen)
		// 	return null;

		return (<div ref={el => this.el = el} class="filter_panel right0" onMouseLeave={::this.onMouseLeave}>
			{this.props.children}
		</div>);
	}
}

ListFilter.propTypes = {
	setInstance: PropTypes.func.isRequired,
	isClosable: PropTypes.func
};

export default enhanceWithClickOutside(ListFilter);