import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import LoaderBlock from 'common/uiElements/LoaderBlock';

import DiscountListComponent from '../components/DiscountListComponent'
import * as selector from '../selectors/discountSelectors'
import * as actions from '../actions/discountActions';


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class DiscountListContainer extends React.Component {

	componentWillMount() {
		const {getListDiscount, listState: {list}} = this.props;
		if (!list.length) getListDiscount();
	}

	onAddFormLayer() {
		const {push} = this.props;
		push({pathname: `/discount/add`});
	}

	onOpenDetailLayout(row) {
		const {openDiscount, push} = this.props;
		openDiscount(row);
		push({pathname: `/discount/edit/${row.code}`});
	}

	onSortList(column, orderBy) {
		const {getListDiscount} = this.props;
		getListDiscount({column, orderBy});
	}

	onCheckActive(code) {
		console.log('onCheckActive', code)
	}

	onFilterChanged(e) {
		let val = e.target.value;
		const {getListDiscount, listState} = this.props;

		if (val && val.length > 2) {
			getListDiscount({
				column: listState.column,
				orderBy: listState.orderBy,
				q: `name=="*${val}*"`
			});
		} else if (!val || val.length === 0) {
			getListDiscount({
				column: listState.column,
				orderBy: listState.orderBy
			});
		}
	}

	onInfinateScroll() {
		const {getListDiscount, listState} = this.props;

		if ((listState.pos + listState.listStep) < listState.total_count) {
			getListDiscount({
				column: listState.column,
				orderBy: listState.orderBy,
				pos: listState.pos + listState.listStep,
				q: listState.q
			});
		}
	}

	render() {
		const {listState} = this.props;

		const noItems = listState.noItem;
		const globalLoading = noItems === '';

		return (
			<div className="h100per">
				{!globalLoading &&
				<div className="title_panel">
					<h1>Скидки</h1>
					{!noItems &&
					<div className="title_actions">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить скидку
						</button>
					</div>}
				</div>}

				{!noItems && !globalLoading &&
				<DiscountListComponent listState={listState}
									   onFilterChanged={::this.onFilterChanged}
									   onCheckActive={::this.onCheckActive}
									   onSortList={::this.onSortList}
									   onInfinateScroll={::this.onInfinateScroll}
									   onOpenDetailLayout={::this.onOpenDetailLayout}/>}

				{noItems && !globalLoading &&
				<div className="center_xy page_center_info page_center_info__discount0">
					<i className="icon icon_discount"/>
					<div className="title">Скидки не созданы</div>
					<p>Скидки можно применять ко всему чеку на кассе</p>
					<div className="form_buttons row">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить скидку
						</button>
					</div>
				</div>}

				<LoaderBlock loading={globalLoading}/>
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
			getListDiscount: actions.getListDiscount.request,
			openDiscount: actions.openFromList
		}, dispatch)
	};
}


export default DiscountListContainer;