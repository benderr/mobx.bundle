import React from 'react'
import {getErrorClassName, getSuccessClassName} from './formFieldHelpers'

export default ({input, label, className, meta: {touched, error, warning, active}}) => {
	return (
		<FormGroup addon="@">
			{touched}
			<input {...input}
				   className={className + getErrorClassName({error, touched}) + getSuccessClassName({error, touched})}
				   type="text" placeholder={label}/>
			{active && error && <span className="error_text">{error}</span>}
		</FormGroup>
	);
}

const FormGroup = (props) => {
	return (
		<div className="form_group">
			<div className="input_group column twelve">
				{props.addon && <div className="input_group_addon addon_code big">{props.addon}</div>}
				{props.children}
			</div>
		</div>
	)
};