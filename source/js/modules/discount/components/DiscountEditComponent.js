import React from 'react'
import {reduxForm} from 'common/formElements'
import {InputField} from 'common/formElements/fields'
import {PrimaryButton} from 'common/uiElements'


class DiscountEditComponent extends React.Component {
	render() {
		const {
			handleSubmit,
			isNew,
			onSubmitForm, onCloseForm, onDeleteForm,
			formState: {loading, success, error}
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit(p => onSubmitForm(isNew, p.toJS()))}>
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
							<InputField className="w100" name="value"/>
						</div>
					</div>

				</div>

				<div className="page_bottom_panel">
					<PrimaryButton type="submit" loading={loading}>Сохранить</PrimaryButton>
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


export default DiscountEditComponent;