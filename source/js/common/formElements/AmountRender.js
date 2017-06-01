import React from 'react'
import radValidate from './radValidateHoc'
import {AmountInput} from 'common/uiElements';

@radValidate({tips: true})
class AmountRender extends React.Component {
	render() {
		const {input, label, className, type, validator, disabled}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<AmountInput {...input}
						 className={classNames}
						 placeholder={label}
						 type={type} disabled={disabled}
						 {...tooltip} />
		);
	}
}

export default AmountRender;