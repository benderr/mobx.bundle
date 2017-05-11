import {showErrorBorder, showSuccessBorder, getErrorMessage, ifCondition, getRandomKey} from './formFieldHelpers'
import React from 'react'

/**
 * HOC для обертки над инпутами, чтобы получить необходимые методы подсветки ошибок и т.д.
 * getTooltipError - текст ошибки для тултипа
 * isError - флаг ошибки
 * isSuccess - флаг валидности поля
 * addClassName - css класс success|error
 * tooltip: tooltip - конфиг для тултипа, который внедреятся в <input/>
 */
function radValidate({tips}={tips: true}) {
	return (WrappedComponent) => {
		return class radValidateHOC extends React.Component {

			constructor(props, context) {
				super(props, context);
				this.validatorId = getRandomKey();
				this.tooltipId = `tooltip_${this.validatorId}`;
			}

			getTooltipConfig(id) {
				return {
					'data-for': id,
					'data-place': "right",
					'data-type': "error",
					'data-event': 'focus',
					'data-event-off': "blur",
					'data-tip': ''
				};
			}

			getTooltipError() {
				const {meta: {touched, error, active, submitFailed}}=this.props;
				return getErrorMessage({error, touched, active, submitFailed})
			}

			render() {
				const {meta:{touched, error, warning, active, dirty, valid, visited, submitFailed}, hideTips}=this.props;
				const tooltip = this.getTooltipConfig(this.tooltipId);
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

				if (tips && !hideTips) {
					const showErrorMessage = this.getTooltipError() != null;
					return (
						<div>
							<WrappedComponent {...this.props} {...validator}/>
							{showErrorMessage &&
							<ReactTooltip id={this.tooltipId} getContent={[::this.getTooltipError, 400]}/>}
						</div>
					)
				} else {
					return <WrappedComponent {...this.props} {...validator}/>
				}

			}
		}
	}
}

export default radValidate;