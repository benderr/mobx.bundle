import React from 'react';

const formGroup = props => {
	return (
		<div className="form_group">
			<div className="input_group column twelve">
				{props.addon && <div className="input_group_addon addon_code big">{props.addon}</div>}
				{props.children}
			</div>
		</div>
	)
};

export default formGroup;