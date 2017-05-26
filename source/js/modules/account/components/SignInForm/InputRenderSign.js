import React from 'react'
import radValidate from 'common/formElements/radValidateHoc'

@radValidate({tips: false})
class InputRenderSign extends React.Component {
	render() {
		const {input, label, addonClass, className, type, validator:{addClassName}}=this.props;
		return (
			<div className="form_group">
				<div className="input_group light w100">
					<input {...input}
						   className={[className || '', addClassName || ''].join(' ')}
						   placeholder={label}
						   type={type}/>
					<div className={'input_group_addon ' + (addonClass || '')}></div>
					<div className="input_light_border_bottom"></div>
				</div>
			</div>
		);
	}
}

export default InputRenderSign