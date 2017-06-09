import {showErrorBorder, showSuccessBorder, getErrorMessage, ifCondition, getRandomKey} from './formFieldHelpers'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import {focus} from 'redux-form/immutable'

/**
 * HOC для обертки над инпутами, чтобы получить необходимые методы подсветки ошибок и т.д.
 * getTooltipError - текст ошибки для тултипа
 * isError - флаг ошибки
 * isSuccess - флаг валидности поля
 * addClassName - css класс success|error
 * tooltip: tooltip - конфиг для тултипа, который внедреятся в <input/>
 *
 * tips - включены ли подскажи тултипа
 * dataOnWrapper - данные для фокусировки и отображению тултипа внедряются в оборачивающий элемент
 */
function radValidate({tips, dataOnWrapper}={tips: true, dataOnWrapper: false}) {
	return (WrappedComponent) => {
		return class radValidateHOC extends React.Component {

			constructor(props, context) {
				super(props, context);
				this.validatorId = getRandomKey();
				this.tooltipId = `tooltip_${this.validatorId}`;
			}

			getTooltipConfig({id, tipEvent = 'focus', tipEventOf = 'blur', tipPlace = 'right'}) {
				return {
					'data-for': id,
					'data-place': tipPlace,
					'data-type': "error",
					'data-event': tipEvent,
					'data-event-off': tipEventOf,
					'data-tip': ''
				};
			}

			componentDidUpdate(prevProps) {
				const {meta: {submitFailed, active, error}} = this.props;
				const {meta: {active: wasActive}} = prevProps;

				if (submitFailed && error && !wasActive && active) {
					setTimeout(() => {
						if (this.wrappedEl) {
							if (!this.wrappedEl.focusator)
								throw 'Component does not contain @focusator:IFocusableElement';
							this.wrappedEl.focusator.setFocus();
						}
					}, 0);
				}
			}


			inFocus() {
				const {meta: {active}}=this.props;
				return active
					||
					(this.wrappedEl
					&& this.wrappedEl.inFocus
					&& this.wrappedEl.inFocus());
			}

			getError() {
				const {meta: {error}}=this.props;
				return error;
			}

			showTooltipError() {
				const {meta: {touched, error, submitFailed}}=this.props;
				return error && (submitFailed || touched);
			}

			render() {
				const {
					meta:{touched, error, warning, active, dirty, valid, visited, submitFailed},
					hideTips, tipEvent, tipEventOf, tipPlace
				}=this.props;

				const tooltip = this.getTooltipConfig({id: this.tooltipId, tipEvent, tipEventOf, tipPlace});

				const highlightError = showErrorBorder({valid, error, active, visited, submitFailed});
				const highlightSuccess = showSuccessBorder({valid, visited, error, active});
				const additionalClassName = ifCondition(highlightError, ' error ') + ifCondition(highlightSuccess, ' success ');

				const validator = {
					error: error,
					isError: highlightError,
					isSuccess: highlightSuccess,
					addClassName: additionalClassName,
					tooltip: tooltip
				};

				if (tips && !hideTips) {
					const showErrorMessage = this.inFocus() && this.showTooltipError();
					return (
						<div>
							<WrappedComponent ref={wrappedEl => this.wrappedEl = wrappedEl} {...this.props}
											  validator={validator}/>
							{showErrorMessage &&
							<ReactTooltip id={this.tooltipId} getContent={[::this.getError, 400]}/>}
						</div>
					)
				} else {
					return <WrappedComponent ref={wrappedEl => this.wrappedEl = wrappedEl} {...this.props} validator={validator}/>
				}

			}
		}
	}
}

export default radValidate;