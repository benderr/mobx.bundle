import React from 'react';
import {reduxForm} from 'common/formElements';
import {PrimaryButton} from 'common/uiElements';

class EditComponent extends React.Component {
	render() {
		const {
			isNew, handleSubmit,
			onSaveSubmit, onCancelSubmit, onDeleteSubmit
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit(onSaveSubmit)}>
				<div className="page_content page_content__contragents with_bottom_panel content_padding">

					<div className="contragent_role_select">
						<input type="checkbox" name="c3" id="21"/>
						<label htmlFor="21" className="label_check"><i className="icon"/><span>Кассир</span></label>

						<input type="checkbox" name="c3" id="22"/>
						<label htmlFor="22" className="label_check"><i className="icon"/><span>Покупатель</span></label>

						<input type="checkbox" name="c3" id="23"/>
						<label htmlFor="23" className="label_check"><i className="icon"/><span>Сотрудник</span></label>

						<br />

						<input type="checkbox" name="c3" id="24"/>
						<label htmlFor="24" className="label_check"><i className="icon"/><span>Поставщик</span></label>

						<input type="checkbox" name="c3" id="25"/>
						<label htmlFor="25" className="label_check"><i className="icon"/><span>Поставщик услуг</span></label>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование</div>
						<div className="property_value col nine">
							<input type="text" name="name" className="w100" />
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col three">Пароль</div>
						<div className="property_value col property_value__w234">
							<input type="text" className="w100" />
						</div>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Статус</div>
						<div className="property_value col property_value__w234">
							<div className="switch_group">
								<div className="switch_item">
									<input type="radio" name="12" id="tab1"/>
									<label htmlFor="tab1">Активный</label>
								</div>
								<div className="switch_item">
									<input type="radio" name="12" id="tab2"/>
									<label htmlFor="tab2">Неактивный</label>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div className="page_bottom_panel">
					<div className="page_bottom_panel">
						<PrimaryButton type="submit" loading={false}>Сохранить</PrimaryButton>
						<a className="button middle wide clean" onClick={onCancelSubmit}>Отмена</a>
						{!isNew && <a className="button middle wide clean mr44 f_right" onClick={onDeleteSubmit}>Удалить</a>}
					</div>
				</div>
			</form>
		);
	}
}

EditComponent = reduxForm({
	form: 'editComponent'
})(EditComponent);


export default EditComponent;