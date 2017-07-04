import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import toJS from 'components/HOC/toJs';
import * as actionEdit from '../actions/editActions';
import * as selectors from '../selectors/contragentSelectors';
import {bindActionCreators} from 'redux';
import EditComponent from '../components/EditComponent';


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@retailPointHOC
@toJS
class EditContainer extends DefaultLayerLayout {
	componentWillMount() {
		console.log('>> EditContainer.componentWillMount');
	}

	onSaveSubmit() {
		console.log('onSaveSubmit');
	}

	onCancelSubmit() {
		console.log('onCancelSubmit');
	}

	onDeleteSubmit() {
		console.log('onDeleteSubmit');
	}

	render() {
		const {editState, isNew, id} = this.props;
		const title = isNew ? 'Добавление контрагента' : 'Редактирование контрагента';
		const contragentData = isNew ? editState.newItem : editState.viewItems[id];

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				<EditComponent isNew={isNew}
							   contragentData={contragentData}
							   initialValues={contragentData}
							   onSaveSubmit={::this.onSaveSubmit}
							   onCancelSubmit={::this.onCancelSubmit}
							   onDeleteSubmit={::this.onDeleteSubmit} />

			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const {action, id} = ownProps.match.params;
	const editState = selectors.getEditSection(state);
	const isNew = !(action === 'edit' && id);

	return {
		action, id, editState, isNew
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({}, dispatch)
	};
}


export default EditContainer;