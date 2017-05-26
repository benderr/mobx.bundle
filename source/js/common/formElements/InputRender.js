import React from 'react'
import radValidate from './radValidateHoc'

@radValidate({tips: true})
class InputRender extends React.Component {
	render() {
		const {input, label, className, type, validator, disabled}=this.props;
		const {tooltip, addClassName}=validator;
		return (
			<input {...input}
				   className={[className || '', addClassName || ''].join(' ')}
				   placeholder={label}
				   type={type} disabled={disabled}
				   {...tooltip} />
		);
	}
}

export default InputRender;