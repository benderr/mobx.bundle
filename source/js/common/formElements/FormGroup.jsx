import React from 'react';

const formGroup = props => {
    return (
        <div class="form_group">
            <div class="input_group column twelve">
                {props.addonClass && <div class={'input_group_addon ' + props.addonClass}></div>}
                {props.children}
            </div>
        </div>
    )
};

export default formGroup;