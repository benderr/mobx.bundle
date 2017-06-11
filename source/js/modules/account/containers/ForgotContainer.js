import React from 'react';
import SignInForm from '../components/SignInForm'
import {connect} from 'react-redux';
import {login} from '../actions/loginActions'
import {bindActionCreators} from 'redux';
import {getSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';

const ForgotContainer = props => {
	const {loading, sendMail, errors}=props;

	const onSend = (props) => {
		sendMail(props.get('email'));
	};

	return (
		<div className="login_section">
			<div className="login_section_center">

			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJs(ForgotContainer));


function mapStateToProps(state, ownProps) {
	return {
		loading: getSection(state).get('loading'),
		errors: getSection(state).get('authError'),
		redirectUrl: '/' //todo ownProps.location.query && ownProps.location.query.redirectUrl || null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		sendMail: bindActionCreators(login.request, dispatch)
	}
}