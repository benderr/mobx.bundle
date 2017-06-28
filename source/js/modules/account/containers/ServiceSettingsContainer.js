import React from 'react';
import * as actions from '../actions/accountActions';
import {bindActionCreators} from 'redux';
import * as accountSelectors from '../selectors/accountSelectors';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import ChangeServiceComponent from '../components/ChangeServiceComponent';
import toJS from 'components/HOC/toJs';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ServiceSettingsContainer extends React.Component {

	componentDidMount() {
		const {getStateIntegration} = this.props;
		getStateIntegration();
	}

	onChangeService(formProps) {
		const {changeServiceState, connectIntegration, disableIntegration} = this.props;
		if (changeServiceState.stateIntegration) {
			connectIntegration({
				msLogin: formProps.get('msLogin'),
				msPassword: formProps.get('msPassword')
			});
		}
		else disableIntegration();
	}

	onSaveIntegration() {
		const {changeServiceState, confirmIntegration} = this.props;
		confirmIntegration({
			msLogin: changeServiceState.msLogin,
			msPassword: changeServiceState.msPassword
		});
	}

	onCancelIntegration() {
		const {cancelIntegration} = this.props;
		cancelIntegration()
	}

	onCheckIntegration() {
		const {changeServiceState, updStateIntegration, defStateIntegration} = this.props;
		updStateIntegration({
			stateIntegration: !changeServiceState.stateIntegration
		});
		defStateIntegration();
	}

	onDefStateIntegration() {
		const {defStateIntegration} = this.props;
		defStateIntegration();
	}

	render() {
		const {changeServiceState} = this.props;
		return (
			<ChangeServiceComponent formState={changeServiceState}
									onCheckIntegration={::this.onCheckIntegration}
									onDefStateIntegration={::this.onDefStateIntegration}
									onSaveIntegration={::this.onSaveIntegration}
									onCancelIntegration={::this.onCancelIntegration}
									onChangeService={::this.onChangeService}/>
		);
	}

}

function mapStateToProps(state) {
	const changeServiceState = accountSelectors.getChangeServiceSection(state);
	return {changeServiceState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getStateIntegration: actions.getStateIntegration.request,
			connectIntegration: actions.connectIntegration.request,
			updStateIntegration: actions.updStateIntegration.action,
			defStateIntegration: actions.defStateIntegration.action,
			confirmIntegration: actions.confirmIntegration.request,
			cancelIntegration: actions.confirmIntegration.failure,
			disableIntegration: actions.disableIntegration.request
		}, dispatch)
	}
}

export default ServiceSettingsContainer;