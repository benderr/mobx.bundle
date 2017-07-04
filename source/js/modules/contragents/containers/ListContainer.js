import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import toJS from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import * as actionList from '../actions/listActions';
import * as actionEdit from '../actions/editActions';
import * as selectors from '../selectors/contragentSelectors';
import ListComponent from '../components/ListComponent';


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class ListContainer extends React.Component {
	componentWillMount() {
		const {getListContragent, listState} = this.props;
		getListContragent({
			column: listState.column,
			orderBy: listState.orderBy
		});
	}

	onSortList(column, orderBy) {
		const {getListContragent} = this.props;
		getListContragent({column, orderBy});
	}

	onAddFormLayer() {
		const {push} = this.props;
		push({pathname: `/contragents/add`});
	}

	onDetailFormLayer(item) {
		const {push, openDetailContragent} = this.props;
		openDetailContragent(item);
		push({pathname: `/contragents/edit/${item.code}`});
	}

	onOpenFilterLayer() {
		console.log('> onOpenFilterLayer');
	}

	render() {
		const {listState} = this.props;
		const noItems = false;

		return (
			<div className="h100per">
				<div className="title_panel">
					<h1>Контрагенты</h1>

					{!noItems &&
					<div className="title_actions">
						<button className="button small light icon-filter show_filter_panel"
								onClick={() => this.onOpenFilterLayer()}>Фильтр
						</button>
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить
							контрагента
						</button>
					</div>}
				</div>

				{!noItems && <ListComponent listState={listState}
											onSortList={::this.onSortList}
											onOpenDetailLayout={::this.onDetailFormLayer}/>}

				{noItems &&
				<div className="center_xy page_center_info page_center_info__contragents0">
					<div className="title">Контрагенты не заданы</div>
					<div className="form_buttons row">
						<button className="button small icon-plus" onClick={() => this.onAddFormLayer()}>Добавить
							контрагента
						</button>
					</div>
				</div>}
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
			getListContragent: actionList.getList.request,
			openDetailContragent: actionEdit.openDetail
		}, dispatch)
	};
}


export default ListContainer;