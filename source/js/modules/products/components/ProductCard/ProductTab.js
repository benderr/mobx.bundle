import React from 'react';
import PropTypes from 'prop-types';
import {isEmpty} from 'common/validators';
import {InputField, AmountField, SelectField} from 'common/formElements/fields';
import {
	measureOptions,
	alcoholOptions,
	vatTagOptions
} from '../../enums/productOptions';

const minPriceValidate = (error) => (price, allValues) => {
	const minPrice = allValues.get('minPrice');
	if (!isEmpty(minPrice) && !isEmpty(price)) {
		return minPrice > price ? error : undefined;
	}
	return undefined;
};

class ProductTab extends React.Component {
	render() {
		const {className}=this.props;

		return (
			<div className={className}>

				<div class="form_group form_horizontal">
					<div class="property_label col three three">Наименование *</div>
					<div class="property_value col six">
						<InputField name="name"
									class="w100"
									required="Укажите наименование"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Код *</div>
					<div class="property_value col six">
						<InputField name="inventCode"
									class="w100"
									required="Укажите код"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Штрих-код *</div>
					<div class="property_value col six">
						<InputField name="barcode"
									class="w100"
									required="Укажите штрих-код"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Цена *</div>
					<div class="property_value col six">
						<AmountField name="price"
									 class="w100"
									 validate={[minPriceValidate('Цена не должна быть меньше минимальной')]}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Мин. цена</div>
					<div class="property_value col six">
						<AmountField name="minPrice"
									 class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Ед. изм.</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="measure"
									 clearable={false}
									 options={measureOptions}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Тип</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="alcoholType"
									 clearable={false}
									 options={alcoholOptions}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">НДС</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="vatTag"
									 clearable={false}
									 options={vatTagOptions}
						/>
					</div>
				</div>
			</div >
		);
	}
}

export default ProductTab;