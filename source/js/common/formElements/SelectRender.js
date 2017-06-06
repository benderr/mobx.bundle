import React from 'react'
import {Select} from 'common/uiElements';
import radValidate from './radValidateHoc'

@radValidate({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {
	render() {
		const {
			input:fieldInput, label, className, validator: {tooltip, addClassName},
			select:{onChange, onBlur, valueKey = 'value', ...selectOptions}
		}=this.props;

		let {onChange:onInputChange, onBlur:onInputBlur, ...input}=fieldInput;

		if (input.value == "") { //хак, при пустой строке показывается будто выбран элемент
			input.value = undefined;
		}

		const onChangeSelect = (obj) => {
			onInputChange(obj ? obj[valueKey] : null);
			if (onChange)
				onChange(obj);
		};

		const onBlurSelect = (event) => {
			onInputBlur(input.value);
			if (onBlur)
				onBlur(event);
		};

		return (<Select className={[className || '', addClassName || ''].join(' ')}
						{...input}
						{...selectOptions}
						valueKey={valueKey}
						onChange={onChangeSelect}
						onBlur={onBlurSelect}
						placeholder={label || ''}
		/>);
	}
}

export default SelectRender;

