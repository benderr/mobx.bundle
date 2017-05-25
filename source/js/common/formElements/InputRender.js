import React from 'react'
import radValidate from './radValidateHoc'

@radValidate({tips: true})
class InputRender extends React.Component {
	render() {
		const {input, label, className, type, addClassName, tooltip, disabled}=this.props;
		return (
			<input {...input}
				   className={className + addClassName}
				   placeholder={label}
				   type={type} disabled={disabled}
				   {...tooltip} />
		);
	}
}

export default InputRender;