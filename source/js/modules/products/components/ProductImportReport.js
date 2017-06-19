import React from 'react';
import PropTypes from 'prop-types';

class ProductImportReport extends React.Component {

	handleClose() {
		this.props.onClose();
	}

	renderErrors() {
		const {report}=this.props;
		const errors = report.importResults.filter(s => s.errors.length > 0).map(sheet => {
			return (
				[(<div class="title">Ошибки в листе "{sheet.name}", для точек - {sheet.points.join(', ')}</div>),
					(sheet.errors.map(row => (
						<p>Товар в строке { row.rowNumber } не удалось загрузить, ошибка: { row.error }</p>)))]
			)
		});
		if (errors.length > 0)
			return (<div class="import_errors_list">{errors}</div>);
		return null;
	}

	renderDuplicates() {
		const {report}=this.props;
		const duplicates = report.importResults.filter(s => s.duplicates.length > 0).map(sheet => {
			return (
				<div>
					<p>В листе {sheet.name}, для точек - {sheet.points.join(', ')}</p>
					{sheet.duplicates.map(row => (<p>В строке { row.rowNumber } дубликат: { row.name }</p>))}
				</div>
			);
		});
		if (duplicates.length > 0)
			return (<div><p>Дубликаты</p> {duplicates} </div>);
		return null;
	}

	renderIgnored() {
		const {report}=this.props;
		return report.ignoredSheets.length > 0 ? (
				<p><span>{report.ignoredSheets.length}</span> листов пропущено</p>) : null;
	}

	renderFailed() {
		const {report}=this.props;
		return report.failedCount > 0 ? (
				<p class="products_error"><span>{report.failedCount}</span> товаров с ошибкой</p>) : null;
	}

	render() {
		const errors = this.renderErrors();
		const duplicates = this.renderDuplicates();
		const ignored = this.renderIgnored();
		const failed = this.renderFailed();

		return (<div class="center_xy  page_center_info  page_center_info__import_report">
			<i class="icon_box_complete"></i>
			<div class="title">Справочник обновлен</div>

			<p><span>{report.successCount}</span> товаров добавлено/обновлено
				из&nbsp;{report.importResults.length}&nbsp;листов</p>
			{failed}
			{ignored}
			<p class="c_light f_small">Не забудьте обновить справочник товаров на кассе: Меню > Сервис >
				Синхронизация</p>
			<div class="form_buttons">
				<button class="button  small  wide" onClick={::this.handleClose}>Отлично!</button>
				<button class="button small light button_file_upload">
					Загрузить другой файл<input type="file" name="" id=""/></button>
			</div>

			{errors}
			{/*{duplicates}*/}

		</div>)
	}
}

const productShape = PropTypes.shape({
	barcode: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	rowNumber: PropTypes.number.isRequired
});

const errorShape = PropTypes.shape({
	error: PropTypes.string,
	rowNumber: PropTypes.number.isRequired
});

ProductImportReport.propTypes = {
	onClose: PropTypes.func.isRequired,
	report: PropTypes.shape({
		successCount: PropTypes.number.isRequired,
		failedCount: PropTypes.number.isRequired,
		ignoredSheets: PropTypes.array.isRequired,
		importResults: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			points: PropTypes.array.isRequired,
			duplicates: PropTypes.arrayOf(productShape).isRequired,
			success: PropTypes.arrayOf(productShape).isRequired,
			errors: PropTypes.arrayOf(errorShape).isRequired
		})).isRequired
	})
};

export default ProductImportReport;