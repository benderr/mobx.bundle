import React from 'react'
import radValidate from './radValidateHoc'

@radValidate({tips: true})
class InputRender extends React.Component {
	render() {
		const {input, label, className, type, addClassName, tooltip}=this.props;
		return (
			<input {...input}
				   className={className + addClassName}
				   placeholder={label}
				   type={type}
				   {...tooltip} />
		);
	}
}

export default InputRender;