import React from 'react'
import {radValidateHoc, InputFocusable} from './validationHelpers'


@radValidateHoc({tips: true})
class InputRender extends React.Component {

	constructor(props) {
		super(props);
		this.focusator = new InputFocusable();
	}

	static defaultProps = {
		disabled: false,
		readOnly: false,
		className: '',
		addClassName: ''
	};

	render() {
		const {input, label, className, type, validator, disabled, readOnly}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className, addClassName].join(' ');
		return (
			<input {...input}
				   ref={input => this.focusator.init(input)}
				   className={classNames}
				   placeholder={label}
				   type={type}
				   disabled={disabled}
				   readOnly={readOnly}
				   {...tooltip} />
		);
	}
}

export default InputRender;