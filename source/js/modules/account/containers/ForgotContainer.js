import React from 'react';
import ForgotForm from '../components/ForgotForm'
import {connect} from 'react-redux';
import {forgot} from '../actions/accountActions'
import {bindActionCreators} from 'redux';
import {getForgotSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';

const ForgotContainer = props => {
	const {loading, sendMail, success, errors}=props;

	const onSendEmail = (props) => {
		sendMail(props.get('email'));
	};

	return (
		<div className="login_section">
			<div className="login_section_center">
				<ForgotForm onSendEmail={onSendEmail}
							loading={loading}
							isSent={success}
							errors={errors}
				/>
			</div>
		</div>
	);
};

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
		sendMail: bindActionCreators(forgot.request, dispatch)
	}
}