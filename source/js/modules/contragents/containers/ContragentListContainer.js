import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import LoaderBlock from 'common/uiElements/LoaderBlock';

import * as selectors from '../selectors/contragentSelectors'
import * as actions from '../actions/contragentActions'
import ContragentListComponent from '../components/ContragentListComponent'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ContragentListContainer extends React.Component {
	componentWillMount() {
		const {getListContragent, listState: {list, error}} = this.props;
		if (!list.length && error == null) getListContragent();
	}

	onAddFormLayer() {
		const {push} = this.props;
		push({pathname: `/contragents/add`});
	}

	onOpenDetailLayout(row) {
		const {openContragent, push} = this.props;
		openContragent(row);
		// push({pathname: `/contragents/add`});
		push({pathname: `/contragents/edit/${row.code}`});
	}

	onSortList(column, orderBy) {
		const {getListContragent, listState} = this.props;
		getListContragent({column, orderBy, q: listState.q});
	}

	onFilterChanged(e) {
		let val = e.target.value;
		const {getListContragent, listState} = this.props;

		if (val && val.length > 0) {
			getListContragent({
				column: listState.column,
				orderBy: listState.orderBy,
				q: val,
				isCashier: listState.isCashier
			});
		} else if (!val || val.length === 0) {
			getListContragent({
				column: listState.column,
				orderBy: listState.orderBy,
				isCashier: listState.isCashier
			});
		}
	}

	onInfinateScroll() {
		const {getListContragent, listState} = this.props;
		if ((listState.pos + listState.listStep) < listState.total_count) {
			getListContragent({
				column: listState.column,
				orderBy: listState.orderBy,
				pos: listState.pos + listState.listStep,
				q: listState.q,
				isCashier: listState.isCashier
			});
		}
	}

	// CASHIER
	onCheckedCashier() {
		const {listState, getListContragent, checkboxCashier} = this.props;
		// checkboxCashier(!listState.filterCashier);

		getListContragent({
			column: listState.column,
			orderBy: listState.orderBy,
			q: listState.q,
			isCashier: !listState.isCashier
		});
	}

	render() {
		const {listState} = this.props;

		const noItems = listState.noItem;
		const globalLoading = noItems === null;

		return (
			<div className="h100per">
				{!globalLoading &&
				<div className="title_panel">
					<h1>Контрагенты</h1>

					{!noItems &&
					<div className="title_actions">
						<button className="button small icon-plus"
								onClick={() => this.onAddFormLayer()}>Добавить контрагента</button>
					</div>}
				</div>}

				{!noItems && !globalLoading &&
				<ContragentListComponent listState={listState}
										 onCheckedCashier={::this.onCheckedCashier}
										 onOpenDetailLayout={::this.onOpenDetailLayout}
										 onSortList={::this.onSortList}
										 onFilterChanged={::this.onFilterChanged}
										 onInfinateScroll={::this.onInfinateScroll} />}

				{noItems && !globalLoading &&
				<div className="center_xy page_center_info page_center_info__contragents0">
					<div className="title">Контрагенты не заданы</div>
					<div className="form_buttons row">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить
							контрагента
						</button>
					</div>
				</div>}

				<LoaderBlock loading={globalLoading}/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const listState = selectors.getListSection(state);
	return {
		listState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			push,
			getListContragent: actions.getListContragent.request,
			checkboxCashier: actions.checkboxCashier,
			openContragent: actions.openFromList
		}, dispatch)
	};
}


export default ContragentListContainer;