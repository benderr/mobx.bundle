import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import LoaderBlock from 'common/uiElements/LoaderBlock';
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'

import ChequeList from '../components/cheque/ChequeList'
import * as selectors from '../selectors/chequeSelectors'
import * as actions from '../actions/chequeActions'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ChequeListContainer extends React.Component {

	componentWillMount() {
		const {getListCheque, listState} = this.props;

		getListCheque({
			isFirst: true,
			sortField: listState.sortField,
			sortDirection: listState.sortDirection
		});
	}

	handleOpenFilter() {
		console.log('handleOpenFilter');
	}

	onHeadSortClick(field, by) {
		const {getListCheque, listState} = this.props;
		getListCheque({sortField: field, sortDirection: by, q: listState.q});
	}

	onFilterChanged(e) {
		let val = e.target.value;
		const {getListCheque, listState} = this.props;

		if (val && val.length > 0) {
			getListCheque({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection,
				q: val
			});
		} else if (!val || val.length === 0) {
			getListCheque({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection
			});
		}
	}

	onBodyItemClick(item) {
		console.log('onBodyItemClick', item);
	}

	onInfinateScroll() {
		const {getListCheque, listState} = this.props;
		if ((listState.pos + listState.listStep) < listState.total_count) {
			getListCheque({
				sortField: listState.sortField,
				sortDirection: listState.sortDirection,
				pos: listState.pos + listState.listStep,
				q: listState.q
			});
		}
	}

	render() {
		const {listState} = this.props;
		const noItems = listState.noItems;
		const globalLoading = noItems === null;

		return (
			<div className={globalLoading ? "h100per loading_block" : "h100per"}>
				<TitlePanel>
					<TitleActions onShowFilter={::this.handleOpenFilter}/>
				</TitlePanel>

				{!globalLoading && !noItems &&
				<ChequeList listState={listState}
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
	const listState = selectors.getSection(state);

	return {
		listState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			push,

			getListCheque: actions.getCheque.request
		}, dispatch)
	};
}


export default ChequeListContainer;