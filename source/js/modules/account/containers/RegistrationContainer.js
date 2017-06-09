import React from 'react';
import RegistrationForm from '../components/RegistrationForm'
import {connect} from 'react-redux';
import {register} from '../actions/registrationActions'
import {bindActionCreators} from 'redux';
import {getSection} from '../selectors/registrationSelectors'

const RegistrationContainer = props => {
	const {loading, register, errors}=props;

	const onRegister = (props) => {
		let model = {
			email: props.get('email'),
			password: props.get('password')
		};
		register(model);
	};

	return (<RegistrationForm onRegister={onRegister} errors={errors} loading={loading}/>);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);


function mapStateToProps(state, ownProps) {
	let regSection = getSection(state);
	return {
		loading: regSection.get('loading'),
		errors: regSection.get('regError'),
		regData: regSection.get('regData')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		register: bindActionCreators(register.request, dispatch)
	}
}