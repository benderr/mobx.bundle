import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJS from 'components/HOC/toJs';
import retailPointRequiredHOC from 'components/HOC/retailPointRequiredHOC'
import {push} from 'connected-react-router'

import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import ListFilter from '../components/ListFilter'
import NoShopDocs from '../components/ishop/NoShopDocs'
import ShopDocs from '../components/ishop/ShopDocs'
import * as shopDocsSelectors from '../selectors/shopDocsSelectors'
import * as actions from '../actions/shopDocsActions'
import {DOCUMENT_TYPE} from '../enums'
import {LoaderPanel} from 'common/uiElements'
import DocumentsFilter from '../components/ishop/DocumentsFilter'

@retailPointRequiredHOC
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ShopDocsContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {pageSize: 15};
	}

	setFilter(filter) {
		this.props.setFilter({filter});
	}

	componentDidMount() {
		this.setFilter({
			restart: true,
			filter: {
				query: ''
			},
			count: this.state.pageSize,
			sortField: 'creationDateTime',
			sortDirection: 'desc'
		});
		this.props.getDocuments();
	}

	handleLoadMore() {
		this.props.getDocuments();
	}

	handleOpenFilter() {
		this.filter && this.filter.open();
	}

	handleChangeFilter(event) {
		let value = event.target.value;
		if (value && value.length > 2) {
			this.setFilter({restart: true, filter: {query: value}});
			this.props.searchDocuments();
		} else if (!value) {
			this.setFilter({restart: true, filter: {query: ''}});
			this.props.searchDocuments();
		}
	}

	handleChangeFilterDocType(event, type) {
		this.setFilter({
			restart: true,
			filter: {
				docType: event.target.checked ? type : null
			}
		});
		this.props.searchDocuments();
	}

	handleChangeFilterStatus(event, status) {
		let selectedStates = this.props.selectedStates || [];
		const isSelected = selectedStates.indexOf(status) >= 0;
		if (isSelected && event.target.checked)
			return;

		if (event.target.checked) {
			selectedStates.push(status);
		} else {
			selectedStates = selectedStates.filter(s => s != status);
		}

		this.setFilter({
			restart: true,
			filter: {
				selectedStates: selectedStates
			}
		});
		this.props.searchDocuments();
	}

	handleChangeDateFrom(dateFrom) {

	}

	handleChangeDateTo(dateTo) {

	}

	handleSortList(sortField = 'beginDateTime', sortDirection = 'desc') {
		this.setFilter({sortField, sortDirection, restart: true});
		this.props.getDocuments();
	}

	handleOpenDocument(id) {
		const {push, selectedPoint} = this.props;
		push(`/documents/ishop/view/${selectedPoint}/${id}`);
	}


	renderFilterIsSet() {
		const {docType, selectedStates}=this.props;
		if (docType)
			return (<span class="filter_count"></span>);
		return null;
	}

	render() {
		const {noItems, documents, loading, totalCount, sortField, sortDirection, docType, selectedStates} = this.props;

		return (
			<div className="h100per">
				<TitlePanel>
					<TitleActions showFilter={false}>
						<a class="button small light icon-filter show_filter_panel  right20"
						   onClick={::this.handleOpenFilter}>
							Фильтры
							{this.renderFilterIsSet()}
						</a>
						<a class="button white icon-filter show_filter_panel float  right20"
						   onClick={::this.handleOpenFilter}>
							{this.renderFilterIsSet()}
						</a>
					</TitleActions>
				</TitlePanel>
				<ListFilter ref={f => this.filter = f}>
					<DocumentsFilter onChangeDocType={::this.handleChangeFilterDocType}
									 onChangeStatus={::this.handleChangeFilterStatus}
									 docType={docType}
									 selectedState={selectedStates}
									 onChangeDateFrom={::this.handleChangeDateFrom}
									 onChangeDateTo={::this.handleChangeDateTo}/>
				</ListFilter>

				{noItems && !loading && <NoShopDocs />}
				{noItems && loading && <LoaderPanel loading={loading}/>}
				{!noItems && <ShopDocs documents={documents}
									   loading={loading}
									   totalCount={totalCount}
									   sortField={sortField}
									   sortDirection={sortDirection}
									   onChangeFilter={::this.handleChangeFilter}
									   onLoadNext={::this.handleLoadMore}
									   onSort={::this.handleSortList}
									   onOpenDocument={::this.handleOpenDocument}/>}

			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		documents: shopDocsSelectors.getDocuments(state),
		loading: shopDocsSelectors.getLoader(state),
		noItems: shopDocsSelectors.getNoItems(state),
		totalCount: shopDocsSelectors.getTotalCount(state),
		sortField: shopDocsSelectors.getFilter(state).get('sortField'),
		sortDirection: shopDocsSelectors.getFilter(state).get('sortDirection'),
		docType: shopDocsSelectors.getFilter(state).getIn(['filter', 'docType']),
		selectedStates: shopDocsSelectors.getFilter(state).getIn(['filter', 'selectedStates'])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			setFilter: actions.setFilter,
			getDocuments: actions.getDocuments.request,
			searchDocuments: actions.searchDocuments,
			resendDocument: actions.reSendDocument.request,
			push: push
		}, dispatch)
	};
}


export default ShopDocsContainer;