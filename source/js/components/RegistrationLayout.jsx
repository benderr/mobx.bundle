import React from 'react';
import ModulHeader from './ModulHeader';
import '../../../../Markup.Kassa/markup/stylus/login.styl';
import '../../../../Markup.Kassa/markup/stylus/kassa_registration.styl';

export default props => {
    return (

        <div class="login reg">
            <ModulHeader/>
            <div className="login_section">
                <div className="login_section_center">
                    {props.children}
                </div>
            </div>
        </div>);
};

