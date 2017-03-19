import React from 'react';
import Menu from 'components/Global/Menu';

//Шаблон для анонимных страниц
const InternalLayout = props => {
    var css = {
        position: 'static'
    };
    return (
        <div className="poss">
            <Menu/>
            <section className="main">
                <div className="section_content" style={css}>
                    {props.children}
                </div>
            </section>
        </div>
    );
};

export default InternalLayout