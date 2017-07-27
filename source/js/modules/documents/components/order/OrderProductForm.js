import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, SelectField, NumberField, AmountField, Field} from 'common/formElements/fields'
import {VAT_TAG_OPTIONS, MEASURE_OPTIONS} from 'modules/core/productEnums';
import {initialize} from 'redux-form/immutable'

class OrderProductForm extends React.Component {

	handleSelectProduct(product) {
		const {change}=this.props;
		change('isNew', product && product.isNew);
		change('name', product ? product.name : '');
		if (product) {
			product.measure && change('measure', product.measure);
			product.vatTag && change('vatTag', product.vatTag);
			change('price', product.price);
			change('minPrice', product.minPrice);
			change('barcode', product.barcode);
		}
	}

	newOptionCreator({label, labelKey, valueKey}) {
		const option = {};
		option[valueKey] = label;
		option[labelKey] = label;
		option.isNew = true;
		return option;
	}

	handleSave(props) {
		const {onSave, dispatch, initialValues}=this.props;
		onSave(props);
		dispatch(initialize(this.props.form, initialValues, false));
	}

	render() {
		const {handleSubmit, onSave, productSearchState:{loading, products, error}, className = ''} = this.props;

		return (
			<form className={className} onSubmit={handleSubmit(::this.handleSave)}>
				<div class="add_order_form">
					<Field className="hidden" name="isNew" component="checkbox"/>
					<Field className="hidden" name="name" component="input"/>
					<Field className="hidden" name="barcode" component="input"/>
					<Field className="hidden" name="minPrice" component="input"/>

					<SelectField required="Укажите полное наименование товара"
								 options={products}
								 wrapperClassName="add_order_form__product"
								 searchable={true}
								 isLoading={loading}
								 tipPlace="top"
								 placeholder="Товар"
								 className="small"
								 labelKey="name"
								 valueKey="inventCode"
								 clearable={true}
								 creatable={true}
								 newOptionCreator={::this.newOptionCreator}
								 onChange={::this.handleSelectProduct}
								 name="inventCode"/>

					<AmountField required="Укажите цену товара"
								 label="Цена"
								 name="price"
								 tipPlace="top"
								 class="small"
								 wrapperClassName="add_order_form__price"/>

					<NumberField label="Кол-во"
								 name="quantity"
								 class="small"
								 wrapperClassName="add_order_form__amount"/>

					<SelectField name="measure"
								 clearable={false}
								 placeholder="Ед. изм."
								 wrapperClassName="add_order_form__units"
								 className="small"
								 options={MEASURE_OPTIONS}/>

					<SelectField name="vatTag"
								 clearable={false}
								 placeholder="НДС"
								 wrapperClassName="add_order_form__nds"
								 className="small"
								 options={VAT_TAG_OPTIONS}/>

					<InputField label="Комментарий"
								class="small"
								name="description"
								wrapperClassName="add_order_form__comment"/>
				</div>

				<button class="button  small  wide  light">Добавить</button>
			</form>
		);
	}
}


OrderProductForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	productSearchState: PropTypes.shape({
		loading: PropTypes.bool,
		error: PropTypes.any,
		products: PropTypes.arrayOf(PropTypes.shape({
			inventCode: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}))
	}),
	className: PropTypes.string
};

OrderProductForm = reduxForm({
	form: 'orderProductForm'
})(OrderProductForm);


export default OrderProductForm;