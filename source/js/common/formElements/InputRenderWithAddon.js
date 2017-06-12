import React from 'react'
import {radValidateHoc, InputFocusable} from './validationHelpers'

@radValidateHoc({tips: false})
class InputRenderWithAddon extends React.Component {
	constructor(props) {
		super(props);
		this.focusator = new InputFocusable();
	}

	render() {
		const {input, label, addonClass, className, type, validator:{addClassName}}=this.props;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<div className="form_group">
				<div className="input_group light w100">
					<input {...input}
						   ref={i => this.focusator.init(i)}
						   className={classNames}
						   placeholder={label}
						   type={type}/>
					<div className={'input_group_addon ' + (addonClass || '')}></div>
					<div className="input_light_border_bottom"></div>
				</div>
			</div>
		);
	}
}

export default InputRenderWithAddon