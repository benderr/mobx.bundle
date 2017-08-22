import React from 'react';
import ForgotForm from '../components/ForgotForm'
import {connect} from 'react-redux';
import {forgot, forgotReset} from '../actions/accountActions'
import {bindActionCreators} from 'redux';
import {getForgotSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import {Link} from 'react-router-dom';
import ModulHeader from 'components/ModulHeader';

class ForgotContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			countError: 0,
			showCaptcha: false,
			captcha: null,
			captchaReady: false
		};
	}

	componentWillReceiveProps(props) {
		const {errors} = props;

		let stateUpdate = {
			countError: this.state.countError,
			showCaptcha: this.state.showCaptcha
		};

		if (errors && errors.status && errors.status === 415) {
			stateUpdate.countError++;
			if (stateUpdate.countError > 3) {
				stateUpdate.showCaptcha = true;
				stateUpdate.captchaReady = false;
				stateUpdate.countError = 0;
			} else {
				stateUpdate.showCaptcha = false;
			}
		}

		this.setState(stateUpdate);
	}

	handleSendEmail(form) {
		if (this.state.showCaptcha) {
			if (!this.state.captcha)
				return false;
		}

		this.props.sendMail(form.get('email'));
	}

	componentWillUnmount() {
		this.props.resetForm();
	}

	onCaptchaChange(value) {
		this.setState({
			captcha: value
		});
	}

	onCaptchaLoad() {
		this.setState({
			captchaReady: true
		});
	}

	render() {
		const {loading, success, errors}=this.props;

		return (
			<div class="login forgot">
				<ModulHeader/>
				<div className="login_section">
					<div className="login_section_center">
						<ForgotForm onSendEmail={::this.handleSendEmail}
									loading={loading}
									isSent={success}
									errors={errors}

									showCaptcha={this.state.showCaptcha}
									captcha={this.state.captcha}
									captchaReady={this.state.captchaReady}
									onCaptchaChange={::this.onCaptchaChange}
									onCaptchaLoad={::this.onCaptchaLoad}
						/>
						<div className="login_links">
							<Link to="/signin">Войти</Link>
							<Link to="/registration">Зарегистрироваться</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
;

export default connect(mapStateToProps, mapDispatchToProps)(toJs(ForgotContainer));


function mapStateToProps(state, ownProps) {
	const forgotState = getForgotSection(state);
	return {
		loading: forgotState.get('loading'),
		errors: forgotState.get('error'),
		success: forgotState.get('success')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			sendMail: forgot.request,
			resetForm: forgotReset
		}, dispatch)
	}
}