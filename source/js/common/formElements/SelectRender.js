import React from 'react'
import {Select} from 'common/uiElements';
import {radValidateHoc, CustomFocusable} from './validationHelpers'

@radValidateHoc({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {

	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {
			input:fieldInput, className, validator: {tooltip, addClassName},
			onSelectChange, onSelectBlur, valueKey = 'value', required, ...selectOptions
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

		const classNames = [className || '', addClassName || ''].join(' ');
		return (<Select ref={s => this.focusator.init(s)}
						className={classNames}
						{...input}
						{...selectOptions}
						inputProps={{...tooltip}}

						valueKey={valueKey}
						onChange={onChangeSelect}
						onBlur={onBlurSelect}
		/>);
	}
}

SelectRender.propTypes = Select.propTypes;

export default SelectRender;



