import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, SelectField, NumberField, AmountField} from 'common/formElements/fields'
import OrderShape from './OrderShape'
import {VAT_TAG_OPTIONS, MEASURE_OPTIONS} from 'modules/core/productEnums';

class OrderForm extends React.Component {

	render() {
		const {handleSubmit, onSave, productOptions, className = ''} = this.props;

		return (
			<form className={className} onSubmit={handleSubmit(onSave)}>
				<div class="light_block">
					<div class="add_order_form">
						<SelectField required="Укажите полное наименование товара"
									 options={productOptions}
									 searchable={true}
									 creatable={true}
									 placeholder="Товар"
									 name="barcode"
									 class="add_order_form__product"/>
						<AmountField required="Укажите цену товара"
									 label="Цена"
									 name="price"
									 class="add_order_form__price"/>
						<NumberField label="Кол-во"
									 name="quantity"
									 class="add_order_form__amount"/>
						<SelectField class="w100"
									 name="measure"
									 clearable={false}
									 placeholder="Ед. изм."
									 options={MEASURE_OPTIONS}/>
						<SelectField class="w100"
									 name="vatTag"
									 clearable={false}
									 placeholder="НДС"
									 options={VAT_TAG_OPTIONS}/>

						<InputField label="Комментарий"
									name="description"
									class="add_order_form__comment"/>
					</div>

					<button class="button  small  wide  light">Добавить</button>
				</div>
			</form>
		);
	}
}


OrderForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	productOptions: PropTypes.arrayOf({
		code: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}),
	className: PropTypes.string
};

OrderForm = reduxForm({
	form: 'orderForm'
})(OrderForm);


export default OrderForm;