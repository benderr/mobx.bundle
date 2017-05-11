import React from 'react';

const formGroup = props => {
    return (
        <div class="form_group">
            <div class="input_group light w100">
                {props.addonClass && <div class={'input_group_addon ' + props.addonClass}></div>}
                {props.children}
                <div class="input_light_border_bottom"></div>
            </div>
        </div>
    )
};

export default formGroup;