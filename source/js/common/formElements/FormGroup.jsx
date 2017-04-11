import React from 'react';

const formGroup = props => {
    return (
        <div className="form_group">
            <div className="input_group column twelve">
                {props.addonClass && <div className={'input_group_addon ' + props.addonClass}></div>}
                {props.children}
            </div>
        </div>
    )
};

export default formGroup;