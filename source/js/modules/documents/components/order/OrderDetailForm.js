import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, TextAreaField, Field} from 'common/formElements/fields'
import OrderShape from './OrderShape'
import {VAT_TAG_OPTIONS, MEASURE_OPTIONS} from 'modules/core/productEnums';
import {initialize} from 'redux-form/immutable'

class OrderDetailForm extends React.Component {

	componentDidMount() {
		const {form, dispatch}=this.props;
		dispatch(initialize(form, {
			beginDateTime: new Date().toISOString(),
			docType: 'SALE',
			status: 'OPENED'
		}, false));
	}

	render() {
		const {handleSubmit, onSave, className} = this.props;

		return (
			<form className={className} onSubmit={handleSubmit(onSave)}>
				<Field name="beginDateTime" component="input" class="hidden"/>
				<Field name="docType" component="input" class="hidden"/>
				<Field name="status" component="input" class="hidden"/>

				<div class="label">Номер заказа</div>
				<InputField name="docNum"
							required="Введите номер заказа"
							class="order_number"/>
				<TextAreaField label="Комментарий"
							   name="description"
							   class="order_commentary"/>
			</form>
		);
	}
}


OrderDetailForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	className: PropTypes.string
};

OrderDetailForm = reduxForm({
	form: 'orderForm'
})(OrderDetailForm);


export default OrderDetailForm;