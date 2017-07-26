import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'
import logger from 'infrastructure/utils/logger'

import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import MoneyList from '../components/money/MoneyList'
import * as actions from '../actions/moneyActions'
import * as selectors from '../selectors/moneySelectors'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
@retailPointHOC
class MoneyListContainer extends React.Component {
	componentWillMount() {
		const {getListMoney, listState} = this.props;

		getListMoney({
			isFirst: true,
			sortField: listState.sortField,
			sortDirection: listState.sortDirection
		});
	}

	handleOpenFilter() {
		logger.log('handleOpenFilter');
	}

	onHeadSortClick(field, direction) {
		const {getListMoney, listState} = this.props;
		getListMoney({
			sortField: field,
			sortDirection: direction,
			q: listState.q
		});
	}

	onFilterChanged(e) {
		const {getListMoney, listState} = this.props;
		let val = e.target.value;
		let obj = {
			sortField: listState.sortField,
			sortDirection: listState.sortDirection
		};

		if (val && val.length > 0)
			obj.q = val;

		getListMoney(obj);
	}

	onInfinateScroll() {
		const {getListMoney, listState} = this.props;

		if ((listState.pos + listState.listStep) < listState.total_count) {
			getListMoney({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection,
				pos: listState.pos + listState.listStep,
				q: listState.q
			})
		}
	}

	render() {
		const {listState} = this.props;
		const noItems = listState.noItems;
		const globalLoading = noItems === null;

		return (
			<div className={globalLoading ? 'h100per loading_block' : 'h100per'}>
				<TitlePanel>
					<TitleActions onShowFilter={::this.handleOpenFilter} showFilter={false}/>
				</TitlePanel>

				{!globalLoading && !noItems &&
				<MoneyList listState={listState}
						   onHeadSortClick={::this.onHeadSortClick}
						   onFilterChanged={::this.onFilterChanged}
						   onInfinateScroll={::this.onInfinateScroll}/>}

				{!globalLoading && noItems &&
				<div className="center_xy page_center_info page_center_info__orders0">
					<i className="icon icon_orders"/>
					<div className="title">Документы отсутствуют</div>
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
			getListMoney: actions.getMoney.request
		}, dispatch)
	};
}


export default MoneyListContainer;