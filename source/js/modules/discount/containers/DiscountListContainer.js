import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';

import DiscountListComponent from '../components/DiscountListComponent'
import * as selector from '../selectors/discountSelectors'
import * as actions from '../actions/discountActions';


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountListContainer extends React.Component {

	componentWillMount() {
		const {getListDiscount} = this.props;
		getListDiscount({
			column: 'name',
			orderBy: 'asc'
		});
	}

	onAddFormLayer() {
		console.log('onAddFormLayer');
	}

	render() {
		const {listState} = this.props;
		const noItems = false;

		console.log('DiscountListContainer', listState);

		return (
			<div className="h100per">
				<div className="title_panel">
					<h1>Скидки</h1>
					{!noItems &&
					<div className="title_actions">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить скидку
						</button>
					</div>}
				</div>

				{!noItems && <DiscountListComponent />}

				{noItems &&
				<div className="center_xy page_center_info page_center_info__discount0">
					<i className="icon icon_discount"/>
					<div className="title">Скидки не созданы</div>
					<p>Скидки можно применять ко всему чеку на кассе</p>
					<div className="form_buttons row">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить скидку
						</button>
					</div>
				</div>}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const listState = selector.getListState(state);
	return {
		listState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			push,
			getListDiscount: actions.getListDiscount.request
		}, dispatch)
	};
}


export default DiscountListContainer;