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
		const {handleSubmit, onSave, className = ''} = this.props;

		return (
			<form className={className} onSubmit={handleSubmit(onSave)}>
				<Field name="beginDateTime" component="input" class="hidden"/>
				<Field name="docType" component="input" class="hidden"/>
				<Field name="status" component="input" class="hidden"/>

				<div class="form_group form_horizontal">
					<div class="property_label col w100px">Номер заказа</div>
					<div class="property_value col nine">
						<InputField label="Номер заказа"
									name="docNum"
									required="Введите номер заказа"
									class="w100"/>
					</div>
				</div>
				<div class="form_group form_horizontal">
					<div class="property_label col w100px">Комментарий</div>
					<div class="property_value col nine">
						<TextAreaField label="Комментарий"
									   name="description"
									   class="w100"/>
					</div>
				</div>
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