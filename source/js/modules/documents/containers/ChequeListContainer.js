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

	render() {
		const {listState} = this.props;

		console.log('render.listState', listState);

		return (
			<div className="h100per">
				<TitlePanel>
					<TitleActions>
						<a className="button small light icon-filter show_filter_panel  right20"
						   onClick={::this.handleOpenFilter}>Фильтры</a>
						<a className="button white icon-filter show_filter_panel float  right20"
						   onClick={::this.handleOpenFilter}>
							<span className="filter_count"/>
						</a>
					</TitleActions>
				</TitlePanel>

				<ListFilter setInstance={f => this.filter = f}>

				</ListFilter>
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