import React from 'react'
import {Select} from 'common/uiElements';
import radValidate from './radValidateHoc'

@radValidate({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {
	render() {
		const {
			input:fieldInput, label, className, validator: {tooltip, addClassName},
			onSelectChange, onSelectBlur, valueKey = 'value', ...selectOptions
		}=this.props;

		let {onChange:onInputChange, onBlur:onInputBlur, ...input}=fieldInput;

		if (input.value == "") { //хак, при пустой строке показывается будто выбран элемент
			input.value = undefined;
		}

		const onChangeSelect = (obj) => {
			onInputChange(obj ? obj[valueKey] : null);
			if (onSelectChange)
				onSelectChange(obj);
		};

		const onBlurSelect = (event) => {
			onInputBlur(input.value);
			if (onSelectBlur)
				onSelectBlur(event);
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

SelectRender.propTypes = Select.propTypes;

export default SelectRender;



