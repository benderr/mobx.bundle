import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import ListFilter from "../components/ListFilter"
import {LoaderPanel} from 'common/uiElements'

import * as selectors from '../selectors/chequeSelectors'
import * as actions from '../actions/chequeActions'
import ChequeList from '../components/cheque/ChequeList'
import ChequeMoneyFilter from '../components/ChequeMoneyFilter'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ChequeListContainer extends React.Component {
	componentDidMount() {
		this.props.getListCheque({isFirst: true});
	}

	componentWillReceiveProps(nextProps) {
		const {getListCheque, selectedPoint} = this.props;
		if (selectedPoint !== nextProps.selectedPoint)
			getListCheque({isFirst: true});
	}

	// открытие фильтра
	handleOpenFilter() {
		this.filter && this.filter.open();
	}

	onSortList(sortField, sortDirection) {
		this.props.getListCheque({sortField, sortDirection});
	}

	// поиск по названию
	onFilterChanged(e) {
		const {getListCheque, setFilterParams} = this.props;
		setFilterParams({q: e.target.value});
		getListCheque();
	}

	// бесконечный скроллинг
	onInfinateScroll() {
		const {getListCheque, listState: {pos, countStep, total_count}} = this.props;
		if ((pos + countStep) < total_count) {
			getListCheque({step: true});
		}
	}

	// region: filter options
	isClosableFilter() {
		if (!this.chequeFilter)
			return true;
		return this.chequeFilter.isClosable();
	}

	handleChangeFilterDocType(event, type) {
		const {getListCheque, setFilterParams} = this.props;
		setFilterParams({docType: event.target.checked ? type : null});
		getListCheque();
	}

	handleChangeDate(date) {
		const {getListCheque, setFilterParams} = this.props;
		setFilterParams({
			dateFrom: date.dateFrom,
			dateTo: date.dateTo
		});
		getListCheque();
	}

	onClearFilter() {
		const {getListCheque, setFilterParams} = this.props;

		setFilterParams({
			dateFrom: null,
			dateTo: null,
			docType: null
		});
		getListCheque();
	}

	// endregion

	render() {
		const {listState, isFilter, searchText} = this.props;
		const {noItems, filter} = listState;
		const globalLoading = noItems === null;

		return (
			<div className="h100per">
				<TitlePanel>
					{!noItems &&
					<TitleActions>
						<a className="button small light icon-filter show_filter_panel right20"
						   onClick={::this.handleOpenFilter}>Фильтры{isFilter && <span className="filter_count"/>}</a>
						<a className="button white icon-filter show_filter_panel float right20"
						   onClick={::this.handleOpenFilter}>
							<span className="filter_count"/>
						</a>
					</TitleActions>}
				</TitlePanel>

				<ListFilter
					setInstance={f => this.filter = f}
					isClosable={::this.isClosableFilter}
					ignoreCloseSelect="no-close-date-selector">
					<ChequeMoneyFilter
						ref={f => this.chequeFilter = f}
						onChangeDocType={::this.handleChangeFilterDocType}
						onChangeDate={::this.handleChangeDate}
						onClearFilter={::this.onClearFilter}
						dateFrom={filter.dateFrom}
						dateTo={filter.dateTo}
						docType={filter.docType}/>
				</ListFilter>

				<LoaderPanel loading={globalLoading}>
					{!globalLoading && !noItems &&
					<ChequeList
						listState={listState}
						searchText={searchText}
						onHeadSortClick={::this.onSortList}
						onFilterChanged={::this.onFilterChanged}
						onInfinateScroll={::this.onInfinateScroll}/>}

					{!globalLoading && noItems &&
					<div
						className={`center_xy page_center_info page_center_info__orders0 ${listState.loading ? 'loading_block' : ''}`}>
						<i className="icon icon_orders"/>
						<div className="title">Чеки отсутствуют</div>
					</div>}
				</LoaderPanel>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const listState = selectors.getChequesSection(state);
	const isFilter = selectors.isFilteredList(state);
	const filter = selectors.getFilter(state);
	const searchText = filter.get('q');
	return {listState, isFilter, searchText};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getListCheque: actions.getListCheque.request,
			setFilterParams: actions.setFilterParams
		}, dispatch)
	};
}


export default ChequeListContainer;