import React from 'react';
import '../../../markup/stylus/login.styl';

const ExternalLayout = (props) => {
    return (
        <div class="login">
            <header class="login_header">
                <a href="#"><strong>Модуль</strong>Касса</a>
            </header>
            {props.children}
        </div>
    );
};

export default ExternalLayout

