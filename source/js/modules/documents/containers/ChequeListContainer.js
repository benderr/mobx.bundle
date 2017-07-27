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
		const {getListCheque} = this.props;

		getListCheque({});
	}

	handleOpenFilter() {
		console.log('handleOpenFilter');
	}

	render() {
		const {listState} = this.props;

		return (
			<div>
				<TitlePanel>
					<TitleActions onShowFilter={::this.handleOpenFilter}/>
				</TitlePanel>

				<ChequeList listState={listState}

							onHeadSortClick={(column, orderBy) => console.log('onHeadSortClick', {column, orderBy})}
							onFilterChanged={(event) => console.log('onFilterChanged', {event})}
							onBodyItemClick={(item) => console.log('onBodyItemClick', {item})} />
				
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