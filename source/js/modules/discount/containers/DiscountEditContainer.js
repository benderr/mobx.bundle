import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout'

class DiscountEditContainer extends DefaultLayerLayout {

	render() {
		const isNew = true;
		const title = isNew ? 'Создание скидки' : 'Редактирование скидки';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>{title}</h1>
				</div>

				<div className="page_content with_bottom_panel content_padding">
					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование *</div>
						<div className="property_value col nine">
							<input type="text" className="w100" />
						</div>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Код *</div>
						<div className="property_value col four">
							<input type="text" className="w100" />
						</div>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Размер, %</div>
						<div className="property_value col four">
							<input type="text" className="w100" />
						</div>
					</div>

					<div className="form_group form_horizontal">
						<div className="property_label col three">Активна</div>
						<div className="property_value col four" style="padding-top: 13px;">
							<input type="checkbox" name="c1" id="9n8y52c9835y" />
							<label htmlFor="9n8y52c9835y" className="label_check switcher">
								<i className="icon" />
							</label>
						</div>
					</div>
				</div>

				<div className="page_bottom_panel">
					<a className="button middle wide">Сохранить</a>
					<a className="button middle wide clean">Отмена</a>
				</div>
			</article>
		);
	}
}

export default DiscountEditContainer;