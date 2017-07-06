import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import toJS from 'components/HOC/toJs';
import * as actionEdit from '../actions/editActions';
import * as selectors from '../selectors/contragentSelectors';
import * as options from '../enums/contragentOptions';
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

	onChangeRoles(contragentCode, roleCode) {
		console.log('onChangeRoles', contragentCode, roleCode);
	}

	onSaveSubmit(props, contragetCode) {
		const {create, update} = this.props;

		let data = {
			name: props.get('name'),
			password: props.get('password'),
			locked: props.get('locked'),
			roles: props.get('roles').map(i => i.toObject()).toArray()
		};
		data.roles = data.roles.filter(e => e.selected === true).map(e => e.name);

		if (contragetCode === 'new') {
			create(data);
		} else {
			update(data, contragetCode);
		}
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

		contragentData.roles = options.rolesCode.map(key => {
			return {
				name: key,
				selected: !(contragentData.roles.indexOf(key) < 0),
				label: options.roles[key].label
			}
		});

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
							   onChangeRoles={::this.onChangeRoles}
							   onSaveSubmit={::this.onSaveSubmit}
							   onCancelSubmit={::this.onCancelSubmit}
							   onDeleteSubmit={::this.onDeleteSubmit}/>

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
		...bindActionCreators({
			changeRole: actionEdit.changeRole,
			create: actionEdit.createContragent.request,
			update: actionEdit.updateContragent.request
		}, dispatch)
	};
}


export default EditContainer;