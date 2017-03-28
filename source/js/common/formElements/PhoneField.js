import React from 'react'

export default ({input, label, meta: {touched, error, warning}}) => {
	return (
		<div className="form_group">
			<div className="input_group column twelve">
				<div className="input_group_addon addon_code big">+7</div>
				<input {...input} className="big" type="text" placeholder={label}/>
				{touched && error && <span className="error_text">{error}</span>}
			</div>
		</div>);
}