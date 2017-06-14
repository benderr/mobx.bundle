import React from 'react';
import PropTypes from 'prop-types';
import ModalPopup from './ModalPopup';
import q from 'q';
/**
 * Попап для подтверждения операции
 */
class ConfirmPopupService extends React.Component {

	open2({onOk, onCancel, onClose, title, text}) {
		this.onClickOk = onOk;
		this.onClickCancel = onCancel;
		this.onClickClose = onClose;
		this.dialog._open();
		this.setState({
			title, text
		});
	}

	open({title, text}) {
		this.setState({
			title, text
		});
		this.dialog._open();
		this.defer = q.defer();
		return this.defer.promise;
	}

	handleOkClick() {
		this.dialog._close();
		this.onClickOk && this.onClickOk();
		this.defer && this.defer.resolve();
	}

	handleCancelClick() {
		this.dialog._close();
		this.onClickCancel && this.onClickCancel();
		this.defer && this.defer.reject({close: false});
	}

	handleCloseClick() {
		this.dialog._close();
		this.onClickClose && this.onClickClose();
		this.defer && this.defer.reject({close: true});
	}

	render() {
		const {title: stateTitle, text:stateText}=this.state || {};
		const {
			parentSelector, onAfterOpen, shouldCloseOnOverlayClick,
			title:propTitle, okName = 'Подтвердить', cancelName, disableClose = false, text:propText, className = ''
		}=this.props;

		const title = stateTitle || propTitle;
		const text = stateText || propText;

		const classNames = ['popup_layer small', className].join(' ');
		return (
			<ModalPopup parentSelector={parentSelector}
						onAfterOpen={onAfterOpen}
						shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
						onRequestClose={::this.handleCloseClick}
						ref={dialog => this.dialog = dialog}>
				<div class={classNames}>
					{!disableClose && <a class="popup_close icon-close" onClick={::this.handleCloseClick}></a>}
					<div>
						{title && <h1>{title}</h1>}

						{text && <p>{title}</p>}

						<div class="popup_panel">
							<button class="button" onClick={::this.handleOkClick}>{okName}</button>
							{cancelName && <a class="button_clean" onClick={::this.handleCancelClick}>{cancelName}</a>}
						</div>
					</div>
				</div>
			</ModalPopup>);
	}
}

ConfirmPopupService.propTypes = {
	parentSelector: PropTypes.func,
	shouldCloseOnOverlayClick: PropTypes.bool,
	title: PropTypes.string,
	okName: PropTypes.string,
	cancelName: PropTypes.string,
	disableClose: PropTypes.bool,
	text: PropTypes.string,
	className: PropTypes.string,
};

export default ConfirmPopupService;