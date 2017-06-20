import React from 'react';
import RegistrationForm from '../components/RegistrationForm'
import {connect} from 'react-redux';
import {register} from '../actions/accountActions'
import {bindActionCreators} from 'redux';
import {getRegistrationSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import {Link} from 'react-router-dom';
import ModulHeader from 'components/ModulHeader';
import styles from 'components/ExternalLayoutStyles';

class RegistrationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			captcha: null,
			captchaReady: false
		};
	}

	onCaptchaChange(value) {
		debugger
		this.setState({
			captcha: value
		});
	}

	onCaptchaLoad() {
		this.setState({
			captchaReady: true
		});
	}

	onRegister(props) {
		if (!this.state.captcha)
			return;
		const {register}=this.props;
		const user = {
			name: props.get('name'),
			surname: props.get('surname'),
			company: props.get('company'),
			phone: props.get('phone'),
			email: props.get('email'),
			password: props.get('password'),
			captcha: this.state.captcha
		};
		register(user);
	}

	render() {
		const {loading, errors, regData}=this.props;

		return (
			<div class="login reg">
				<ModulHeader/>
				<div className="login_section">
					<div className="login_section_center">
						<RegistrationForm onRegister={::this.onRegister}
										  errors={errors}
										  loading={loading}
										  regData={regData}
										  captcha={this.state.captcha}
										  captchaReady={this.state.captchaReady}
										  onCaptchaChange={::this.onCaptchaChange}
										  onCaptchaLoad={::this.onCaptchaLoad}
						/>
						<div className="login_links">
							<Link to="/signin">Войти</Link>
							<Link to="/forgot">Забыли пароль?</Link>
						</div>
					</div>

				</div>
			</div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(RegistrationContainer));

function mapStateToProps(state, ownProps) {
	let regSection = getRegistrationSection(state);
	return {
		loading: regSection.get('loading'),
		errors: regSection.get('error'),
		regData: regSection.get('success')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		register: bindActionCreators(register.request, dispatch)
	}
}