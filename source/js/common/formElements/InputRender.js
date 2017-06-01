import React from 'react'
import radValidate from './radValidateHoc'

@radValidate({tips: true})
class InputRender extends React.Component {
	render() {
		const {input, label, className, type, validator, disabled}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<input {...input}
				   className={classNames}
				   placeholder={label}
				   type={type} disabled={disabled}
				   {...tooltip} />
		);
	}
}

export default InputRender;