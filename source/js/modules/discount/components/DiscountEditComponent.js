import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, NumberField} from 'common/formElements/fields'
import {PrimaryButton} from 'common/uiElements'


class DiscountEditComponent extends React.Component {
	render() {
		const {
			handleSubmit,
			isNew, onSubmitForm, onCloseForm, onDeleteForm, formState
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="page_content with_bottom_panel content_padding">

					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование</div>
						<div className="property_value col nine">
							<InputField className="w100" name="name" required="Укажите наименование" />
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col three">Размер, %</div>
						<div className="property_value col four">
							<NumberField className="w100" name="value"
										 required="Укажите размер скидки"/>
						</div>
					</div>

				</div>

				<div className="page_bottom_panel">
					<PrimaryButton type="submit" loading={formState.loading}>Сохранить</PrimaryButton>
					<a className="button middle wide clean" onClick={onCloseForm}>Отмена</a>
					{!isNew && <a className="button middle wide clean mr44 f_right" onClick={onDeleteForm}>Удалить</a>}
				</div>
			</form>
		);
	}
}

DiscountEditComponent = reduxForm({
	form: 'editDiscount',
	enableReinitialize: true
})(DiscountEditComponent);

DiscountEditComponent.propTypes = {
	isNew: PropTypes.bool.isRequired,
	onSubmitForm: PropTypes.func.isRequired,
	onCloseForm: PropTypes.func.isRequired,
	onDeleteForm: PropTypes.func.isRequired,
	formState: PropTypes.object.isRequired
};


export default DiscountEditComponent;