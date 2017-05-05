import React from 'react';

//Шаблон для анонимных страниц
const ExternalLayout = (props) => {
    return (
        <div className="reg">
            {props.children}
        </div>
    );
};

export default ExternalLayout

import '../../markup/stylus/404.styl';

export const NotFoundLayout = (props) => {
    return (
        <div className="reg_var2">
            <div className="page4041">
                <a href="#" className="logo">ModulBank</a>
                <div className="content_wrap">
                    <div className="content_cell">
                        <div className="content">
                            <h1>СТРАНИЦА НЕ НАЙДЕНА</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

