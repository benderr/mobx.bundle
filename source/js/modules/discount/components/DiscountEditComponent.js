import React from 'react';
import {reduxForm} from 'common/formElements';


class DiscountEditComponent extends React.Component {
	render() {
		const {
			handleSubmit,
			isNew,
			onSubmitForm
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit(p => onSubmitForm(p.toJS()))}>
				<div className="page_content with_bottom_panel content_padding">
					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование *</div>
						<div className="property_value col nine">
							<input type="text" className="w100"/>
						</div>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Код *</div>
						<div className="property_value col four">
							<input type="text" className="w100"/>
						</div>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Размер, %</div>
						<div className="property_value col four">
							<input type="text" className="w100"/>
						</div>
					</div>
				</div>

				<div className="page_bottom_panel">
					<button className="button middle wide">Сохранить</button>
					<a className="button middle wide clean">Отмена</a>
					{!isNew && <button className="button middle wide clean mr44 f_right">Удалить</button>}
				</div>
			</form>
		);
	}
}


export default DiscountEditComponent;