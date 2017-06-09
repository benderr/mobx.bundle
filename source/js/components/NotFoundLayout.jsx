import React from 'react';
import '../../../markup/stylus/404.styl';
import {withRouter} from 'react-router';

const NotFoundLayout = () => {
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

export default withRouter(NotFoundLayout)

