import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import * as actions from '../actions/accountActions';
import {bindActionCreators} from 'redux';
import * as accountSelectors from '../selectors/accountSelectors';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import ChangePasswordComponent from '../components/ChangePasswordComponent';
import ChangeServiceComponent from '../components/ChangeServiceComponent';
import toJS from 'components/HOC/toJs';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class SettingsContainer extends DefaultLayerLayout {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		super.openLayer();
		const {tab, getStateIntegration} = this.props;
		this.setState({tab: tab || 'changepassword'});

		getStateIntegration();
	}

	componentWillReceiveProps(props) {
		const {tab} = props;
		tab && this.setState({tab: tab});
	}

	onChangePassword(formProps) {
		const {changePassword} = this.props;
		changePassword({
			oldPassword: formProps.get('oldPassword'),
			newPassword: formProps.get('newPassword')
		});
	}

	onChangeService(formProps) {
		const {changeServiceState, connectIntegration, disableIntegration} = this.props;
		if (changeServiceState.stateIntegration) {
			connectIntegration({
				msLogin: formProps.get('msLogin'),
				msPassword: formProps.get('msPassword')
			});
		} else {
			console.log('> disableIntegration');
			disableIntegration();
		}
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
		const {changePasswordState, changeServiceState} = this.props;
		const {tab: activeTab} = this.state || {};
		const changePassTab = activeTab == 'changepassword';
		const servicesTab = activeTab == 'services';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Настройки</h1>
				</div>
				<div class="page_content  page_content__settings">
					<div class="tabs tabs_vertical">
						<div class="tabs_menu">
							<ul>
								<li className={changePassTab ? 'active' : ''}>
									<Link to={{
										pathname: '/settings',
										hash: '#changepassword'
									}}>Смена пароля</Link>
								</li>
								<li className={servicesTab ? 'active' : ''}>
									<Link to={{
										pathname: '/settings',
										hash: '#services'
									}}>Сервисы</Link>
								</li>
							</ul>
						</div>

						<div class="tabs_content">
							{changePassTab &&
							<div class="tab_password_change">
								<ChangePasswordComponent formState={changePasswordState}
														 onChangePassword={::this.onChangePassword}/>
							</div>}
							{servicesTab &&
							<div class="tab_sevices">
								<ChangeServiceComponent formState={changeServiceState}
														onCheckIntegration={::this.onCheckIntegration}
														onDefStateIntegration={::this.onDefStateIntegration}
														onSaveIntegration={::this.onSaveIntegration}
														onCancelIntegration={::this.onCancelIntegration}
														onChangeService={::this.onChangeService}/>
							</div>}
						</div>
					</div>
				</div>
			</article>
		);
	}
}

SettingsContainer.propTypes = {
	tab: PropTypes.string
};

export default SettingsContainer;

function mapStateToProps(state, ownProps) {
	const tab = (ownProps.location.hash || '').replace('#', '');

	const changePasswordState = accountSelectors.getChangePasswordSection(state);
	const changeServiceState = accountSelectors.getChangeServiceSection(state);

	return {tab, changePasswordState, changeServiceState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			changePassword: actions.changePassword.request,

			// интеграция с МойСклад
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