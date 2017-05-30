import React from 'react'
import {Select} from 'common/uiElements/uiComponents';
import radValidate from './radValidateHoc'

@radValidate({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {
	render() {
		const {input, label, className, validator: {tooltip, addClassName}, onChange, onBlur, ...otherProps}=this.props;
		let inputValues = input;
		if (input && input.value == "") { //хак, при пустой строке показывается будто выбран элемент
			inputValues = {...input};
			inputValues.value = undefined;
		}

		const onChangeSelect = (value) => {
			input.onChange(value);
			if (onChange)
				onChange(value);
		};

		const onBlurSelect = (value) => {
			input.onBlur(input.value);
			if (onBlur)
				onBlur(value);
		};

		return (<Select className={[className || '', addClassName || ''].join(' ')}
						{...inputValues}
						{...otherProps}
						placeholder={label || ''}
						onChange={onChangeSelect}
						onBlur={onBlurSelect}
		/>);
	}
}

export default SelectRender;

