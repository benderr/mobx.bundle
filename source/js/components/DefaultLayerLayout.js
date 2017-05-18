import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

class DefaultLayerLayout extends React.Component {
	static propTypes = {
		layerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		onCloseLayer: PropTypes.func.isRequired
	};

	addClass(el, className) {
		el.classList.add(className);//todo возможно потребуется заменить методы если где то не поддерживается
	}

	removeClass(el, className) {
		el.classList.remove(className); //todo возможно потребуется заменить методы если где то не поддерживается
	}

	closeLayer() {
		const el = ReactDOM.findDOMNode(this);
		if (el) {
			this.removeClass(el, 'open');
			this.addClass(el, 'hide');
		}
		setTimeout(() => this.props.onCloseLayer({layerId: this.props.layerId}), 400);
	}

	toggleFullSize() {
		const el = ReactDOM.findDOMNode(this);
		const btn = el.querySelector('#page_expand_' + this.props.layerId);
		if (this.fullSize) {
			this.removeClass(el, 'fullsize');
			this.removeClass(btn, 'rotate');
			this.fullSize = false;
		}
		else {
			this.fullSize = true;
			this.addClass(btn, 'rotate');
			this.addClass(el, 'fullsize');
		}
		return false;
	}

	componentDidMount() {
		const el = ReactDOM.findDOMNode(this);
		setTimeout(_ => this.addClass(el, 'open'), 0);
	}

	getCloseButton() {
		return (<a className="page_close icon-close" onClick={::this.closeLayer}></a>);
	}

	getToogleButton() {
		return (<a id={'page_expand_' + this.props.layerId} className="page_expand icon-fullsize"
				   onClick={::this.toggleFullSize}></a>);
	}

	render() {
		return (
			<article className="page">
				<div className="page_header header_height_auto">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Тестовый слой</h1>
				</div>
				<div className="page_content">
					{this.props.children}
				</div>
			</article>
		);
	}
}

export default DefaultLayerLayout;