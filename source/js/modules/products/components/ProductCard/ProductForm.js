import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form/immutable';
import {isEmpty} from 'common/validators/validators'
import InputRender from 'common/formElements/InputRender'
const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

class ProductForm extends React.Component {
	render() {
		const {className}=this.props;

		return (
			<div className={className}>

				<div class="form_group form_horizontal">
					<div class="property_label col three three">Наименование *</div>
					<div class="property_value col six">
						<Field name="name" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите наименование')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Код *</div>
					<div class="property_value col six">
						<Field name="inventCode" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите код')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Штрих-код *</div>
					<div class="property_value col six">
						<Field name="barcode" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите штрих-код')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Цена *</div>
					<div class="property_value col six">
						<Field name="price" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите цену')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Мин. цена</div>
					<div class="property_value col six">
						<Field name="minPrice" type="text"
							   class="w100"
							   component={InputRender}
							   validate={[isRequired('Укажите мин. цену')]}/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Ед. изм.</div>
					<div class="property_value col six">
						<Field class="w100 ms-choice" name="measure" component="select">
							<option value="pcs">Штука</option>
							<option value="kg">Килограмм</option>
							<option value="ltr">Литр</option>
						</Field>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Тип</div>
					<div class="property_value col six">
						<Field class="w100 ms-choice" name="alcoholType" component="select">
							<option value="NO_ALCOHOL">Обычный</option>
							<option value="LIGHT_ALCOHOL">Слабоалкогольный</option>
							<option value="ALCOHOL">Алкоголь</option>
						</Field>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">НДС</div>
					<div class="property_value col six">
						<Field class="w100 ms-choice" name="vatTag" component="select">
							<option value="0">по умолчанию (из настроек)</option>
							<option value="1104">НДС 0%</option>
							<option value="1103">НДС 10%</option>
							<option value="1102">НДС 18%</option>
							<option value="1105">НДС не облагается</option>
							<option value="1107">НДС с рассч. ставкой 10%</option>
							<option value="1106">НДС с рассч. ставкой 18%</option>
						</Field>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductForm;