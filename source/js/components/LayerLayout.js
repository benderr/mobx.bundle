import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6
const LayerLayout2 = (props) => {
	console.log('render layout');
	const goBack = () => {
		props.history.goBack();
	};
	return (
		<article className="page open">
			<div className="page_header header_height_auto">
				<a className="page_close icon-close" onClick={goBack}></a>
				<a className="page_expand icon-fullsize"></a>
				<h1>Тестовый слой {props.location.pathname}</h1>
			</div>
			<div className="page_content">
				{props.children}
			</div>
		</article>
	);
};

class LayerLayout extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			opened: false
		};
	};

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return false;
	// }

	componentWillUnmount() {
		console.log('did UNMOUNT');
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.setState({opened: false});
		}
	}

	componentDidMount() {
		console.log('did mount');
		this.timeoutId = setTimeout(() => {
			this.setState({opened: true});
		}, 0);
	}

	goBack() {
		this.props.onCloseLayer({layerId: this.props.layerId});
	}

	render() {
		let openClass = 'open';
		setTimeout(() => openClass = 'open', 100);
		let className = 'page';
		if (this.state.opened)
			className += ' open';
		return (
			<article className={className} key="layer-key">
				<div className="page_header header_height_auto">
					<a className="page_close icon-close" onClick={() => this.goBack()}></a>
					<a className="page_expand icon-fullsize"></a>
					<h1>Тестовый слой</h1>
				</div>
				<div className="page_content">
					{this.props.children}
				</div>
			</article>
		);
	}
}

export default LayerLayout;