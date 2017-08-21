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
import toJS from 'components/HOC/toJs';
import ServiceSettingsContainer from './ServiceSettingsContainer';
import {getToken} from 'modules/account/selectors/accountSelectors'
import * as tokenCrypt from 'infrastructure/utils/tokenCrypt'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
class SettingsContainer extends DefaultLayerLayout {

	componentDidMount() {
		super.openLayer();
		const {tab} = this.props;
		this.setState({tab: tab || 'changepassword'});
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

	render() {
		const {changePasswordState, userData, token} = this.props;
		const {tab: activeTab} = this.state || {};
		const changePassTab = activeTab == 'changepassword';
		const servicesTab = activeTab == 'services';
		const {email} = tokenCrypt.decrypt(token);

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
								<div className="form_group">
									<div className="column four property_label">Пользователь</div>
									<div className="column eight property_value">{userData.name} <span className="property_label">{email}</span></div>
								</div>
								<ChangePasswordComponent formState={changePasswordState}
														 onChangePassword={::this.onChangePassword}/>
							</div>}
							{servicesTab &&
							<div class="tab_sevices">
								<ServiceSettingsContainer />
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
	const userData = accountSelectors.getUser(state);
	const token = getToken(state);
	return {tab, changePasswordState, userData, token};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			changePassword: actions.changePassword.request
		}, dispatch)
	}
}