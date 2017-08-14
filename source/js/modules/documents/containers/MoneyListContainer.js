import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'

import MoneyList from '../components/money/MoneyList'
import * as selectors from '../selectors/moneySelectors'
import * as actions from '../actions/moneyActions'
import ListFilter from "../components/ListFilter"
import ChequeMoneyFilter from "../components/ChequeMoneyFilter"


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
@retailPointHOC
class MoneyListContainer extends React.Component {
	componentDidMount() {
		const {getListMoney, listState} = this.props;

		getListMoney({
			isFirst: true,
			sortField: listState.sortField,
			sortDirection: listState.sortDirection
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedPoint != this.props.selectedPoint) {
			const {getListMoney, listState} = this.props;
			getListMoney({
				isFirst: true,
				sortField: listState.sortField,
				sortDirection: listState.sortDirection
			});
		}
	}

	onHeadSortClick(field, by) {
		const {getListMoney, listState} = this.props;
		getListMoney({sortField: field, sortDirection: by, q: listState.q});
	}

	onFilterChanged(e) {
		let val = e.target.value;
		const {getListMoney, listState} = this.props;

		if (val && val.length > 0) {
			getListMoney({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection,
				q: val
			});
		} else if (!val || val.length === 0) {
			getListMoney({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection
			});
		}
	}

	onInfinateScroll() {
		const {getListMoney, listState} = this.props;
		if ((listState.pos + listState.listStep) < listState.total_count) {
			getListMoney({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection,
				pos: listState.pos + listState.listStep,
				q: listState.q
			});
		}
	}


	// region Filtered

	handleOpenFilter() {
		this.filter && this.filter.open();
	}

	isClosableFilter() {
		if (!this.chequeFilter)
			return true;
		return this.chequeFilter.isClosable();
	}

	handleChangeDate(date) {
		const {setFilterProps, listState: {docsFilter}} = this.props;
		setFilterProps({
			dateFrom: date.dateFrom,
			dateTo: date.dateTo,
			docType: docsFilter.docType
		});
	}

	handleChangeFilterDocType(e, type) {
		const {setFilterProps, listState: {docsFilter}} = this.props;

		let state = {
			dateFrom: docsFilter.dateFrom,
			dateTo: docsFilter.dateTo,
			docType: docsFilter.docType
		};
		let pos = state.docType.indexOf(type);

		if (pos >= 0) {
			state.docType.splice(pos, 1);
		} else {
			state.docType.push(type);
		}

		setFilterProps(state);
	}

	// endregion Filtered

	render() {
		const {listState} = this.props;
		const {dateFrom, dateTo, docType} = listState.docsFilter;
		const noItems = listState.noItems;
		const globalLoading = noItems === null;

		return (
			<div className={globalLoading ? "h100per loading_block" : "h100per"}>
				<TitlePanel>
					<TitleActions showButtons={true}
								  onShowFilter={::this.handleOpenFilter}/>
				</TitlePanel>

				<ListFilter setInstance={f => this.filter = f}
							isClosable={::this.isClosableFilter}
							ignoreCloseSelect="no-close-date-selector">
					<ChequeMoneyFilter ref={f => this.chequeFilter = f}
									   onChangeDocType={::this.handleChangeFilterDocType}
									   onChangeDate={::this.handleChangeDate}
									   dateFrom={dateFrom}
									   dateTo={dateTo}
									   docType={docType}
					/>
				</ListFilter>

				{!globalLoading && !noItems &&
				<MoneyList listState={listState}
						   onHeadSortClick={::this.onHeadSortClick}
						   onFilterChanged={::this.onFilterChanged}

						   onInfinateScroll={::this.onInfinateScroll}/>}

				{!globalLoading && noItems &&
				<div className="center_xy page_center_info page_center_info__orders0">
					<i className="icon icon_orders"/>
					<div className="title">Чеки отсутствуют</div>
				</div>}

			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const listState = selectors.getMoney(state);

	return {listState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getListMoney: actions.getMoney.request,
			setFilterProps: actions.setFilterProps
		}, dispatch)
	};
}


export default MoneyListContainer;