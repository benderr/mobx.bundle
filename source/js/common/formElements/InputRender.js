import React from 'react'
import ReactTooltip from 'react-tooltip'
import {showErrorBorder, showSuccessBorder, getErrorMessage, ifCondition} from './formFieldHelpers'

let id = 1;
export default ({input, label, className, type, meta: {touched, error, warning, active, dirty, valid, visited, submitFailed}}) => {

	const highlightError = showErrorBorder({valid, error, active, visited, submitFailed});
	const highlightSuccess = showSuccessBorder({valid, visited, error, active});
	const additionalClassName = ifCondition(highlightError, ' error ') + ifCondition(highlightSuccess, ' success ');
	const getTooltipError = () => getErrorMessage({error, touched, active, submitFailed});

	let tooltipId = `tooltip_${id}`;
	let tooltip = {
		'data-for': tooltipId,
		'data-place': "right",
		'data-type': "error",
		'data-event': 'focus',
		'data-event-off': "blur",
		'data-tip': ''
	};

	const showErrorMessage = getTooltipError() != null;

	return (
		<div className="w100">
			<input {...input}
				   className={className + additionalClassName}
				   placeholder={label}
				   type={type}
				   {...tooltip} />
			{showErrorMessage && <ReactTooltip id={tooltipId} getContent={[getTooltipError, 400]}/>}
		</div>
	);
}