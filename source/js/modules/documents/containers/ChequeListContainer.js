import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import ListFilter from "../components/ListFilter"

import * as selectors from '../selectors/chequeSelectors'
import * as actions from '../actions/chequeActions'
import ChequeList from '../components/cheque/ChequeList'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ChequeListContainer extends React.Component {
	componentWillMount() {
		this.props.getListCheque({isFirst: true});
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
		let val = e.target.value;
		this.props.getListCheque({q: val});
	}

	// бесконечный скроллинг
	onInfinateScroll() {
		const {getListCheque, listState: {pos, countStep, total_count}} = this.props;
		if ((pos + countStep) < total_count) {
			getListCheque({step: true});
		}
	}

	render() {
		const {listState} = this.props;
		const {noItems} = listState;
		const globalLoading = noItems === null;

		console.log('render.listState', listState);

		return (
			<div className="h100per">
				<TitlePanel>
					{!noItems &&
					<TitleActions>
						<a className="button small light icon-filter show_filter_panel  right20"
						   onClick={::this.handleOpenFilter}>Фильтры</a>
						<a className="button white icon-filter show_filter_panel float  right20"
						   onClick={::this.handleOpenFilter}>
							<span className="filter_count"/>
						</a>
					</TitleActions>}
				</TitlePanel>

				<ListFilter setInstance={f => this.filter = f}>

				</ListFilter>

				{!globalLoading && !noItems &&
				<ChequeList
					listState={listState}
					onHeadSortClick={::this.onSortList}
					onFilterChanged={::this.onFilterChanged}
					onInfinateScroll={::this.onInfinateScroll}/>}

				{!globalLoading && noItems &&
				<div className="center_xy page_center_info page_center_info__orders0">
					<i className="icon icon_orders"/>
					<div className="title">Чеки отсутствуют</div>
				</div>}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const listState = selectors.getChequesSection(state);
	return {listState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getListCheque: actions.getListCheque.request
		}, dispatch)
	};
}


export default ChequeListContainer;