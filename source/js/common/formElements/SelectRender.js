import React from 'react'
import {Select} from 'common/uiElements/uiComponents';
import radValidate from './radValidateHoc'

@radValidate({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {
	render() {
		const {input, label, className, validator: {tooltip, addClassName}, ...otherProps}=this.props;
		let inputValues = input;
		if (input && input.value == "") {
			inputValues = {...input};
			inputValues.value = undefined;
		}

		return (<Select className={[className || '', addClassName || ''].join(' ')}
						{...inputValues}
						placeholder={label || ''}
						{...otherProps} />);
	}
}

export default SelectRender;

