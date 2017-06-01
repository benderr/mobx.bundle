import {showErrorBorder, showSuccessBorder, getErrorMessage, ifCondition, getRandomKey} from './formFieldHelpers'
import React from 'react'
import ReactTooltip from 'react-tooltip'

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

			getTooltipError() {
				const {meta: {touched, error, active, submitFailed}}=this.props;
				return getErrorMessage({error, touched, active, submitFailed})
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
					getTooltipError: this.getTooltipError,
					isError: highlightError,
					isSuccess: highlightSuccess,
					addClassName: additionalClassName,
					tooltip: tooltip
				};

				const wrapperValidator = dataOnWrapper ? {...validator.tooltip, tabIndex: 0} : null;

				if (tips && !hideTips) {
					const showErrorMessage = this.getTooltipError() != null;
					return (
						<div>
							<WrappedComponent {...this.props} validator={validator}/>
							{showErrorMessage &&
							<ReactTooltip id={this.tooltipId} getContent={[::this.getTooltipError, 400]}/>}
						</div>
					)
				} else {
					return <WrappedComponent {...this.props} validator={validator}/>
				}

			}
		}
	}
}

export default radValidate;