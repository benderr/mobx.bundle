import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements';
import ProductImportReport from './ProductImportReport';
class ProductImport extends React.Component {


	handleUpload(files) {
		const {onUploadFiles} = this.props;
		files && files.length && onUploadFiles(files[0]);
	}

	openFileDialog() {
		this.fileUploadInput.click();
	}


	render() {
		const {uploading, result, error, onClose} = this.props;

		const isDefault = !uploading && !result && !error;
		const isUploading = uploading;
		const classNames = ['page_content', result ? 'with_bottom_report_panel' : ''].join(' ');
		return (
			<div className={classNames}>
				{isDefault &&
				<div class="center_xy  page_center_info  page_center_info__import_from_file">
					<i class="icon_import"></i>
					<h2>Импортируйте свои товары из файла</h2>
					<p>Файл должен быть в формате csv, xls или xlsx.<br/> Если не знаете как сформировать файл<br/>
						<a>скачайте наш пример</a></p>
					<div class="form_buttons  row">
						<PrimaryButton loading={uploading} className="button_file_upload"
									   onClick={::this.openFileDialog}>
							Выбрать файл
						</PrimaryButton>
						<input type="file"
							   ref={input => this.fileUploadInput = input}
							   onChange={(ev) => this.handleUpload(ev.target.files)}
							   style={{display: "none"}}
							   accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
						/>
					</div>
				</div>}
				{isUploading &&
				<div class="center_xy  page_center_info">
					<div class="loading big">
						<div>Идет загрузка ваших товаров</div>
					</div>
				</div>}
				{!!result && <ProductImportReport report={result}
												onClose={onClose}/>
				}
				{!!error && <div className="info info_error">
					К сожалению, загрузить товары не удалось. Убедитесь в корректности данных справочников товаров и
					попробуйте снова.
					еще
				</div>}
			</div>
		)
	}
}

ProductImport.propTypes = {
	onUploadFiles: PropTypes.func.isRequired,
	uploading: PropTypes.bool.isRequired,
	result: PropTypes.object,
	error: PropTypes.object,
	onClose: PropTypes.func.isRequired
};

export default ProductImport;

